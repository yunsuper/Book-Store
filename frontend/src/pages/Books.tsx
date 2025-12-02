import styled from "styled-components";
import Title from "../components/common/Title";
import BooksEmpty from "../components/books/BooksEmpty";
import BooksList from "../components/books/BooksList";
import BooksFilter from "../components/books/BooksFilter";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import Loading from "../components/common/Loading";
import Button from "../components/common/Button";
import useInfiniteBooks from "../hooks/useBooksInfinite";

function Books() {
    const {
        books,
        pagination,
        isEmpty,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteBooks();

    // const sentinelRef = useRef<HTMLDivElement>(null);

    // 🔥 무한스크롤 감지 센서 (자동 로딩)
    // useEffect(() => {
    //     if (!hasNextPage) return;
    //     if (!sentinelRef.current) return;

    //     const observer = new IntersectionObserver(
    //         (entries) => {
    //             if (entries[0].isIntersecting && !isFetchingNextPage) {
    //                 fetchNextPage();
    //             }
    //         },
    //         { threshold: 1 }
    //     );

    //     observer.observe(sentinelRef.current);

    //     return () => observer.disconnect();
    // }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

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

                {!isEmpty && <BooksList books={books} />}
                {isEmpty && <BooksEmpty />}

                {/* 🔥 더보기 버튼 (수동 로딩) */}
                {!isEmpty && hasNextPage && (
                    <div className="more-btn">
                        <Button
                            size="medium"
                            schema="primary"
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                        >
                            {isFetchingNextPage ? "로딩 중..." : "더보기"}
                        </Button>
                    </div>
                )}

                {/* 🔥 무한스크롤 센서 */}
                {/* {hasNextPage && <div ref={sentinelRef} className="sentinel" />} */}

                {/* 로딩 스피너 */}
                {isFetchingNextPage && <Loading />}

                {/* 마지막 페이지 메시지 */}
                {!hasNextPage && books.length > 0 && (
                    <p className="end-message">마지막 페이지입니다.</p>
                )}
            </BooksStyle>
        </>
    );
}

const BooksStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    .filter {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
    }

    .sentinel {
        width: 100%;
        height: 1px;
    }

    .more-btn {
        display: flex;
        justify-content: center;
        position: sticky;
        bottom: 0;
        padding: 16px 0;
        background: white;
        z-index: 10;
    }

    .end-message {
        text-align: center;
        color: gray;
        padding-bottom: 24px;
    }
`;

export default Books;
