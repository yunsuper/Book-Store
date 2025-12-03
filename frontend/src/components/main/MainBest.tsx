import styled from 'styled-components';
import type { Book } from '../../models/book.model';
import BookBestItem from '../books/BookBestItem';
import type { Theme } from '../../style/theme';

interface Props{
    books: Book[];
}

function MainBest({ books }: Props) {
    return (
        <MainBestStyle>
           {books.map((item, index)=>(
            <BookBestItem key={item.id} books={item} itemIndex={index} />
           ))}
        </MainBestStyle>
    );
}

const MainBestStyle = styled.div<{ theme: Theme }>`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;

    @media ${({ theme }) => theme.device.mobile}{
        grid-template-columns: repeat(2, 1fr);
    }
`;

export default MainBest;
