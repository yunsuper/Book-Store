import { http, HttpResponse } from "msw";
import type { Book } from "../models/book.model";
import { fa, fakerKO } from "@faker-js/faker";

const bestBooksData: Book[] = Array.from({ length: 10 }).map((_, index) => ({
    id: index,
    title: fakerKO.lorem.sentence(),
    img: fakerKO.number.int({ min: 100, max: 200 }),
    category_id: fakerKO.number.int({ min: 1, max: 3 }),
    form: "종이책",
    isbn: fakerKO.commerce.price(),
    summary: fakerKO.lorem.paragraph(),
    detail: fakerKO.lorem.paragraph(),
    author: fakerKO.person.firstName(),
    pages: fakerKO.number.int({ min: 100, max: 500 }),
    contents: fakerKO.lorem.paragraph(),
    price: parseInt(fakerKO.commerce.price({ min: 10000, max: 50000 }), 10),
    likes: fakerKO.number.int({ min: 0, max: 100 }),
    pubDate: fakerKO.date.past().toISOString(),
    createdAt: fakerKO.date.past().toISOString(),
}));

export const bestBooks = http.get("http://localhost:9999/books/best",()=>{  
    return HttpResponse.json(bestBooksData, {
        status: 200,
    });
}) 