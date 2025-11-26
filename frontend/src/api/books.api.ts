import type { Book } from "../models/book.model";
import type { Pagination } from "../models/pagination.model";
import { httpClient } from "./http";

interface FetchBooksParams {
    category_id?: number;
    news?: boolean;
    currentPage?: number;
    limit: number;
}

interface FetchBooksResponse {
    books: Book[];
    pagination: Pagination;
}

export const fetchBooks = async (
    params: FetchBooksParams
): Promise<FetchBooksResponse> => {
    try {
        const queryParams = {
            ...params,
            news: params.news ? "true" : undefined, // ★ 문자열 변환
        };

        const response = await httpClient.get("/books", {
            params: queryParams,
        });

        return response.data;
    } catch (error) {
        console.error("❌ fetchBooks error:", error);

        return {
            books: [],
            pagination: {
                currentPage: params.currentPage ?? 1,
                totalCount: 0,
            },
        };
    }
};