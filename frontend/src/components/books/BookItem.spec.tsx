import React from "react";
import {render, screen} from "@testing-library/react";
import BookItem from "./BookItem";
import { BookStoreThemeProvider } from "../../context/themeContext";

const dummyBook = {
  id: 1,
  title: "Dummy Book",
  img: 5,
  category_id: 1,
  summary: "Dummy Summary",
  author: "Dummy Author",
  price: 10000,
  likes: 1,
  form: "paperback",
  isbn: "Dummy ISBN",
  detail: "Dummy Detail",
  pages: 100,
  contents: "Dummy Contents",
  pubDate: "2025-11-25",
};

describe.skip("BookItem", () => {
    it("렌더 여부", () => {
        const { getByText, getByAltText } = render(
            <BookStoreThemeProvider>
                <BookItem book={dummyBook} />
            </BookStoreThemeProvider>
        );
        expect(screen.getByText(dummyBook.title)).toBeInTheDocument();
        expect(screen.getByText(dummyBook.author)).toBeInTheDocument();
        expect(screen.getByText(dummyBook.summary)).toBeInTheDocument();
        expect(screen.getByText("10,000원")).toBeInTheDocument();
        expect(screen.getByText(String(dummyBook.likes))).toBeInTheDocument();
        expect(screen.getByAltText(dummyBook.title)).toHaveAttribute(
            "src",
            `https://picsum.photos/id/${dummyBook.img}/600/600`
        );
    });
});