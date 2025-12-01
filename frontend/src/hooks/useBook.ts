import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { addCart } from "../api/carts.api";
import { useAlert } from "./useAlert";
import { useAuthStore } from "../store/authStore";
import { queryClient } from "./queryClient";
import type { BookDetail } from "../models/book.model";

export const useBook = (bookId: string | undefined) => {
    const { isLoggedIn } = useAuthStore();
    const { showAlert } = useAlert();

    // 안전하게 key 고정
    const key = String(bookId);

    // ---------------------------------------------------
    // 1) 도서 상세 조회
    // ---------------------------------------------------
    const {
        data: book,
        isLoading,
        isError,
        error,
    } = useQuery<BookDetail>({
        queryKey: ["book", key],
        // ✅ 서버 liked(0/1)를 boolean으로 변환
        queryFn: async () => {
            const data = await fetchBook(key);
            return {
                ...data,
                liked: Boolean((data as any).liked),
            };
        },
        enabled: !!bookId,
    });

    // ---------------------------------------------------
    // 2) 좋아요 토글 (★ 캐시 직접 안 건드림)
    // ---------------------------------------------------
    const likeMutation = useMutation({
        mutationFn: async () => {
            if (!book) throw new Error("도서 정보가 없습니다.");

            if (book.liked) {
                // 이미 좋아요인 상태 → 취소
                return await unlikeBook(book.id);
            } else {
                // 아직 좋아요 아님 → 추가
                return await likeBook(book.id);
            }
        },
        onSuccess: () => {
            // ✅ 서버에서 최신 값 다시 가져오기
            queryClient.invalidateQueries({ queryKey: ["book", key] });
        },
    });

    const likeToggle = () => {
        if (!isLoggedIn) {
            showAlert("로그인이 필요합니다.");
            return;
        }
        if (!bookId) return;
        likeMutation.mutate();
    };

    // ---------------------------------------------------
    // 3) 장바구니
    // ---------------------------------------------------
    const cartMutation = useMutation({
        mutationFn: (quantity: number) =>
            addCart({
                book_id: book!.id,
                quantity,
            }),
        onSuccess: () => {
            showAlert("장바구니에 담겼습니다!");
        },
    });

    const addToCart = (quantity: number) => {
        if (!book) return;
        cartMutation.mutate(quantity);
    };

    return {
        book,
        likeToggle,
        addToCart,
        isLoading,
        isError,
        error,
        isCartAdding: cartMutation.isPending,
        isCartAdded: cartMutation.isSuccess,
    };
};
