import { useEffect, useState } from "react";
import type { Book, BookReviewItem } from "../models/book.model";
import { fetchReviewAll } from "../api/review.api";
import { fetchBestBooks, fetchBooks } from "../api/books.api";
import type { Banner } from "../models/banner.model";
import { fetchBanners } from "../api/banner.api";



export  const useMain =() =>{
    const [reviews, setReviews] = useState<BookReviewItem[]>([]);
    const [newBooks, setNewBooks] = useState<Book[]>([]);
    const [ bestBooks, setBestBooks] = useState<Book[]>([]);
    const [banners, setBanners] = useState<Banner[]>([]);


    useEffect(()=>{
        fetchReviewAll().then((reviews)=>{
            setReviews(reviews);
        })

        fetchBooks({
            category_id: undefined,
            news: true,
            currentPage: 1,
            limit: 4,
        }).then((books) => {
            setNewBooks(books.books);
        });

        fetchBestBooks().then((books)=>{
            setBestBooks(books);
        })

        fetchBanners().then((banners)=>{
            setBanners(banners);
        })

    },[])
    return { reviews, newBooks, bestBooks, banners };
}

