import styled from "styled-components";
import Title from "../components/common/Title";
import BooksEmpty from "../components/books/BooksEmpty";
import Pagination from "../components/books/Pagination";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import BooksList from "../components/books/BooksList";
import BooksFilter from "../components/books/BooksFilter";
import { useLocation } from "react-router-dom";
import { useBooks } from "../hooks/useBooks";

function Books() {
    const {books, pagination, isEmpty}= useBooks();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const categoryIdParam = params.get("category_id");
    const categoryId = categoryIdParam ? Number(categoryIdParam) : null;

    console.log("Books search:", location.search);
    console.log("categoryId:", categoryId);

    return (
        <>
            <Title size="large">도서 검색 결과</Title>
            <BooksStyle>
                <div className="filter">
                    <BooksFilter />
                    <BooksViewSwitcher />
                </div>
                {!isEmpty && <BooksList books={books} />}
                {isEmpty && <BooksEmpty />}
                {!isEmpty && <Pagination pagination={pagination} />}
            </BooksStyle>
        </>
    );  
}

const BooksStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;

    .filter {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
    }
`;

export default Books;