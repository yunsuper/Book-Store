import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { addCart } from "../api/carts.api";
import { useAlert } from "./useAlert";
import { useAuthStore } from "../store/authStore";
import { queryClient } from "./queryClient";
import { BookReviewItem, type BookDetail, type BookReviewItemWrite } from "../models/book.model";
import { useEffect, useState } from "react";
import { addBookReview, fetchBookReviews } from "../api/review.api";
import { useToast } from "./useToast";

export const useBook = (bookId: string | undefined) => {
    const { isLoggedIn } = useAuthStore();
    const { showAlert } = useAlert();
    const [reviews, setReviews] = useState<BookReviewItem[]>([]);
    const{showToast} = useToast();

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

     useEffect(() => {
         if (!bookId) return;

         fetchBookReviews(bookId).then((reviews) => {
             setReviews(reviews);
         });
     }, [bookId]);

     const addReview = (data:BookReviewItemWrite)=>{
        if(!book) return;

        addBookReview(book.id.toString(), data).then((res)=>{
        //    fetchBookReviews(book.id.toString()).then((reviews) => {
        //        setReviews(reviews);
        //    });
        showAlert(res?.message);
        }   
     )}

    // ---------------------------------------------------
    // 2) 좋아요 토글 (★ 캐시 직접 안 건드림)
    // ---------------------------------------------------
     type LikeMutationResult = {
         action: "like" | "unlike";
         res: any;
     };

    const likeMutation =
        useMutation <
        LikeMutationResult>({
            mutationFn: async () => {
                if (!book) throw new Error("도서 정보가 없습니다.");

                if (book.liked) {
                    // 이미 좋아요인 상태 → 취소
                    return { action: "unlike", res: await unlikeBook(book.id) };
                } else {
                    // 아직 좋아요 아님 → 추가
                    return { action: "like", res: await likeBook(book.id) };
                }
            },
            onSuccess: ({ action }) => {
                // ✅ 서버에서 최신 값 다시 가져오기
                queryClient.invalidateQueries({ queryKey: ["book", key] });

                if (action === "unlike") {
                    showToast("좋아요를 취소했습니다.", "info");
                } else {
                    showToast("좋아요를 성공했습니다.", "success");
                }
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
        reviews,
        addReview,
        likeToggle,
        addToCart,
        isLoading,
        isError,
        error,
        isCartAdding: cartMutation.isPending,
        isCartAdded: cartMutation.isSuccess,
    };
};
