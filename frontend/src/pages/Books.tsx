import styled from "styled-components";
import Title from "../components/common/Title";
import BooksEmpty from "../components/books/BooksEmpty";
import Pagination from "../components/books/Pagination";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import BooksList from "../components/books/BooksList";
import BooksFilter from "../components/books/BooksFilter";
import { useBooks } from "../hooks/useBooks";
import Loading from "../components/common/Loading";

function Books() {
    const { books, pagination, isEmpty, isLoading, isError, error } =
        useBooks();

    if (isLoading) return <Loading />;
    if (isError) return <p>에러 발생: {String(error)}</p>;

    return (
        <>
            <Title size="large">도서 검색 결과</Title>
            <BooksStyle>
                <div className="filter">
                    <BooksFilter />
                    <BooksViewSwitcher />
                </div>

                {/* 정상 렌더링 */}
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
