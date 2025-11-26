import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { Book } from "../models/book.model";
import type { Pagination } from "../models/pagination.model";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../hooks/constants/querystring";
import { LIMIT } from "./constants/pagination";

export const useBooks=()=>{
    const location = useLocation();;
    
    const [books, setBooks] = useState<Book[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 1,
        totalCount: 0,
    });
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        console.log("params", params.get("category_id"));

        fetchBooks ({
            category_id: params.get(QUERYSTRING.CATEGORY_ID) ? Number(params.get(QUERYSTRING.CATEGORY_ID)):undefined,
            news: params.get(QUERYSTRING.NEWS) === "true" ? true : undefined,
            currentPage: params.get(QUERYSTRING.PAGE) ? Number(params.get(QUERYSTRING.PAGE)):1,
            limit: LIMIT,
        }).then(({books, pagination})=>{
            setBooks(books);
            setPagination(pagination);
            setIsEmpty(books.length === 0);
        })
    }, [location.search]);

    return {books, pagination, isEmpty, setBooks, setPagination};
};

