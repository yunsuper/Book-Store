import styled from "styled-components";
import type { BookDetail } from "../../models/book.model";
import InputText from "../common/InputText";
import Button from "../common/Button";
import { useState } from "react";
import type { Theme } from "../../style/theme";
import { Link } from "react-router-dom";
import { useBook } from "../../hooks/useBook";

interface Props {
    book: BookDetail;
}

function AddToCart({ book }: Props) {
    const [quantity, setQuantity] = useState<number>(1);
    const { addToCart, isCartAdded, isCartAdding } = useBook(
        book.id.toString()
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value));
    };

    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    return (
        <AddToCartStyle $added={isCartAdded}>
            <div>
                <InputText
                    inputType="number"
                    value={quantity}
                    onChange={handleChange}
                />
                <Button size="medium" schema="normal" onClick={handleIncrease}>
                    +
                </Button>
                <Button size="medium" schema="normal" onClick={handleDecrease}>
                    -
                </Button>
            </div>

            <Button
                size="medium"
                schema="primary"
                onClick={() => addToCart(quantity)}
                disabled={isCartAdding}
            >
                {isCartAdding ? "담는 중..." : "장바구니 담기"}
            </Button>

            <div className="added">
                <p>장바구니에 추가되었습니다.</p>
                <Link to="/cart">장바구니로 이동</Link>
            </div>
        </AddToCartStyle>
    );
}

interface AddToCartStyleProps {
    $added: boolean;
}

const AddToCartStyle = styled.div<AddToCartStyleProps & { theme: Theme }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .added {
        position: absolute;
        bottom: -90px;
        right: 0;
        background: ${({ theme }) => theme.color.background};
        border-radius: ${({ theme }) => theme.borderRadius.default};
        padding: 8px 12px;
        opacity: ${({ $added }) => ($added ? "1" : "0")};
        transition: all 0.5s ease;

        p {
            padding: 0 0 8px 0;
            margin: 0;
        }
    }
`;

export default AddToCart;
