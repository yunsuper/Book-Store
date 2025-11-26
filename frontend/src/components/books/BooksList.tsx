import styled from "styled-components";
import BookItem from "./BookItem";
import type { Book } from "../../models/book.model";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { QUERYSTRING } from "../../hooks/constants/querystring";
import { ViewMode } from "./BooksViewSwitcher";

interface Props {
    books: Book[];
}

function BooksList({ books }: Props) {
    const [view, setView] = useState<ViewMode>("grid");
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const v = params.get(QUERYSTRING.VIEW);

        if (v === "grid" || v === "list") {
            setView(v);
        }
    }, [location.search]);

    return (
        <BooksListStyle $view={view}>
            {books.map((item) => (
                <BookItem key={item.id} book={item} $view={view} />
            ))}
        </BooksListStyle>
    );
}

const BooksListStyle = styled.div<{ $view: ViewMode }>`
    display: grid;
    grid-template-columns: ${({ $view }) =>
        $view === "grid" ? "repeat(4, 1fr)" : "repeat(1, 1fr)"};
    gap: 24px;
`;

export default BooksList;
