import styled from 'styled-components';
import type { Book } from '../../models/book.model';
import BookItem, { BookItemStyle } from './BookItem';
import type { Theme } from '../../style/theme';

interface Props{
  books: Book;
  itemIndex: number;
}

function BookBestItem({ books, itemIndex }:Props) {
  return (
    <BookBestItemStyle>
      <BookItem book={books} $view="grid" />
      <div className="rank">{itemIndex + 1}</div>
    </BookBestItemStyle>
  );
}

const BookBestItemStyle = styled.div<{ theme: Theme
 }>`
    ${BookItemStyle} {
        .summary,
        .price,
        .likes {
            display: none;
        }

        h2{
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    position: relative;
    
    .rank {
        position: absolute;
        top: -10px;
        left: -10px;
        width: 40px;
        height: 40px;
        background: ${({ theme }) => theme.color.primary};
        border-radius: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.25rem;
        color: #fff;
        font-weight: 700;
        font-style: italic;
    }
`;

export default BookBestItem;