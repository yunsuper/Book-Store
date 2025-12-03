import styled from 'styled-components';
import type { BookReviewItem as IBookReviewItem } from "../../models/book.model";
import { formatDate } from '../../utils/format';
import type { Theme } from '../../style/theme';
import { FaStar } from 'react-icons/fa6';

const StarIcon = FaStar as unknown as React.ComponentType<
    React.SVGProps<SVGSVGElement>
>;

const StyledStarIcon = styled(StarIcon)`
    color: ${({ theme }) => theme.color.primary};
    fill: ${({ theme }) => theme.color.primary};
`;

interface Props {
    review: IBookReviewItem;
}

const Star = (props: Pick<IBookReviewItem, "score">)=>{
    return (
        <span className="star">
            {Array.from({ length: props.score }).map((_, index) => (
                <StyledStarIcon key={index} />
            ))}
        </span>
    );
}

function BookReviewItem({ review }: Props) {
    return (
        <BookReviewItemStyle>
            <header className='header'>
                <div>
                    <span>
                        {review.userName}
                    </span>
                    <span>
                        <Star score={review.score} />
                    </span>
                </div>
                <div>
                    {formatDate(review.createdAt)}
                </div>
            </header>
            <div className='content'>
                <p>
                    {review.content}
                </p>
            </div>
        </BookReviewItemStyle>
    );
}

const BookReviewItemStyle = styled.div<{ theme: Theme }>`
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    padding: 12px;
    border-radius: ${({ theme }) => theme.borderRadius.default};

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0%.875rem;
        color: ${({ theme }) => theme.color.secondary};
        padding: 0;

        .star {
            padding: 0 0 0 8px;
            svg {
                color: ${({ theme }) => theme.color.primary};
            }
        }
    }

    .content {
        p {
            font-size: 1rem;
            line-height: 1.5;
            margin: 0;
        }
    }

    @media ${({ theme }) => theme.device.mobile} {
        padding: 8px 10px;
        gap: 8px;
        border-radius: 8px;

        .header {
            font-size: 0.8rem;

            div {
                display: flex;
                flex-direction: column;
                gap: 2px;
            }

            .star {
                padding: 0;
                svg {
                    width: 12px;
                    height: 12px;
                }
            }
        }

        .content {
            p {
                font-size: 0.85rem;
                line-height: 1.35;

                /* ⭐ 모바일에서 내용 너무 길지 않도록 제한 */
                display: -webkit-box;
                -webkit-line-clamp: 5;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
`;

export default BookReviewItem;