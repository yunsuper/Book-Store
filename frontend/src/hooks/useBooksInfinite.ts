import {
    useInfiniteQuery,
    type InfiniteData,
    type QueryFunctionContext,
} from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { fetchBooks } from "../api/books.api";
import { LIMIT } from "../constants/pagination";
import { QUERYSTRING } from "../constants/querystring";
import type { FetchBooksResponse } from "../api/books.api";

export const useInfiniteBooks = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const categoryId = params.get(QUERYSTRING.CATEGORY_ID)
        ? Number(params.get(QUERYSTRING.CATEGORY_ID))
        : undefined;

    const news = params.get(QUERYSTRING.NEWS) === "true" ? true : undefined;

    const queryKey = ["books-infinite", { categoryId, news }];

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery<FetchBooksResponse, Error>({
        queryKey,
        initialPageParam: 1,

        queryFn: (ctx: QueryFunctionContext<any, number>) =>
            fetchBooks({
                category_id: categoryId,
                news,
                currentPage: ctx.pageParam,
                limit: LIMIT,
            }),

        getNextPageParam: (lastPage) => {
            const { currentPage, totalCount } = lastPage.pagination;
            const totalPages = Math.ceil(totalCount / LIMIT);
            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
    });

    const infinite =
        (data as InfiniteData<FetchBooksResponse, number> | undefined) ??
        undefined;

    const books = infinite?.pages.flatMap((p) => p.books) ?? [];

    const lastPage = infinite?.pages[infinite.pages.length - 1];
    const pagination = lastPage?.pagination;

    const isEmpty = books.length === 0;

    return {
        books,
        pagination,
        isEmpty, 
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    };
};

export default useInfiniteBooks;
