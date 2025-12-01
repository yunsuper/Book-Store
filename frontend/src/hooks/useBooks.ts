import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { fetchBooks } from "../api/books.api";
import { LIMIT } from "../constants/pagination";
import { QUERYSTRING } from "../constants/querystring";
import type { FetchBooksResponse } from "../api/books.api"; // 👈 타입 import 필요

export const useBooks = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const categoryId = params.get(QUERYSTRING.CATEGORY_ID)
        ? Number(params.get(QUERYSTRING.CATEGORY_ID))
        : undefined;

    const news = params.get(QUERYSTRING.NEWS) === "true" ? true : undefined;

    const currentPage = params.get(QUERYSTRING.PAGE)
        ? Number(params.get(QUERYSTRING.PAGE))
        : 1;

    const queryKey = ["books", { categoryId, news, currentPage, limit: LIMIT }];

    const { data, isLoading, isError, error } = useQuery<FetchBooksResponse>({
        queryKey,
        queryFn: () =>
            fetchBooks({
                category_id: categoryId,
                news,
                currentPage,
                limit: LIMIT,
            }),

        // v5에서 keepPreviousData는 제거됨
        placeholderData: (prev) => prev, // 👈 이전 데이터 유지 (v4 기능 대신)
        staleTime: 1000 * 60 * 2,
    });

    return {
        books: data?.books ?? [],
        pagination: data?.pagination ?? { currentPage: 1, totalCount: 0 },
        isEmpty: (data?.books?.length ?? 0) === 0,
        isLoading,
        isError,
        error,
    };
};
