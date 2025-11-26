import styled from "styled-components";
import type { Book } from "../../models/book.model";
import { getImgSrc } from "../../utils/images";
import { formatNumber } from "../../utils/format";
import { FaHeart } from "react-icons/fa6";
import type { ViewMode } from "./BooksViewSwitcher";
import "styled-components";
import type { Theme } from "../../style/theme";

interface Props {
    book: Book;
    $view?: ViewMode;
}

const HeartIcon = FaHeart as unknown as React.ComponentType;

function BookItem({ book, $view }: Props) {
    return (
        <BookItemStyle $view={$view}>
            <div className="img">
                <img src={getImgSrc(book.img)} alt={book.title} />
            </div>

            <div className="content">
                <h2 className="title">{book.title}</h2>
                <p className="summary">{book.summary}</p>
                <p className="author">{book.author}</p>
                <div className="bottom">
                    <div className="price">{formatNumber(book.price)}원</div>

                    <div className="likes">
                        <HeartIcon />
                        <span>{book.likes}</span>
                    </div>
                </div>
            </div>
        </BookItemStyle>
    );
}

const BookItemStyle = styled.div<{ theme: Theme; $view: ViewMode }>`
    display: flex;

    /* ⭐ view 모드에 따라 레이아웃 변경 */
    flex-direction: ${({ $view }) => ($view === "grid" ? "column" : "row")};
    align-items: ${({ $view }) =>
        $view === "grid" ? "stretch" : "flex-start"};

    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    border-radius: ${({ theme }) => theme.borderRadius.default};
    overflow: hidden;
    gap: ${({ $view }) => ($view === "grid" ? "0" : "16px")};

    /* ⭐ 이미지 영역 */
    .img {
        width: ${({ $view }) => ($view === "grid" ? "100%" : "160px")};
        height: ${({ $view }) => ($view === "grid" ? "240px" : "160px")};
        flex-shrink: 0;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
    }

    /* ⭐ 내용 영역 */
    .content {
        padding: 16px;
        position: relative;
        flex: ${({ $view }) => ($view === "grid" ? "0" : "1")};
        display: flex;
        flex-direction: column;
        justify-content: ${({ $view }) =>
            $view === "grid" ? "flex-start" : "space-between"};

        .title {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 12px;
        }
        .bottom {
            margin-top: auto;
            display: flex;
            justify-content: space-between; /* 좌우 끝 정렬 */
            align-items: center;
            width: 100%;
        }

        .summary,
        .author {
            font-size: 0.875rem;
            color: ${({ theme }) => theme.color.secondary};
            margin-bottom: 4px;
        }

        .price {
            font-size: 1rem;
            font-weight: 700;
            margin-bottom: 4px;
        }

        .likes {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-size: 0.875rem;
            color: ${({ theme }) => theme.color.primary};
            border: 1px solid ${({ theme }) => theme.color.border};
            border-radius: ${({ theme }) => theme.borderRadius.default};
            padding: 4px 12px;

            /* ⭐ 리스트 모드일 때 오른쪽 아래 고정 */
            position: ${({ $view }) =>
                $view === "grid" ? "absolute" : "static"};
            bottom: ${({ $view }) => ($view === "grid" ? "16px" : "auto")};
            right: ${({ $view }) => ($view === "grid" ? "16px" : "auto")};

            svg {
                color: ${({ theme }) => theme.color.primary};
            }
        }
    }
`;


export default BookItem;
