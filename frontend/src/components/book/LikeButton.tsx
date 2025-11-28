import styled from "styled-components";
import type { BookDetail } from "../../models/book.model";
import Button from "../common/Button";
import { FaHeart } from "react-icons/fa6";
import type { Theme } from "../../style/theme";

declare module "styled-components" {
    export interface DefaultTheme extends Theme {}
}

const HeartIcon = FaHeart as unknown as React.ComponentType;


interface Props{
    book: BookDetail;
    onClick: () => void;
}

function LikeButton({book, onClick}: Props) {
    return (
        <LikeButtonStyle size="medium" schema={book.liked ? "like" : "normal"} onClick={onClick}>
            <HeartIcon />
            {book.likes}
        </LikeButtonStyle>
    );
}

const LikeButtonStyle = styled(Button)`
    display: flex;
    gap: 6px;

    svg{
        color: inherit;
        *{
            color: inherit;
        }
    }
`;

export default LikeButton;