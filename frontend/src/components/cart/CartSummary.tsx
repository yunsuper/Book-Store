import styled from "styled-components";
import { formatNumber } from "../../utils/format";
import type { Theme } from "../../style/theme";

interface Props{
    totalQuantity: number;
    totalPrice: number;
}

function CartSummary({totalQuantity, totalPrice}: Props) {
  return (
      <CartSummaryStyle>
          <h1>주문 요약</h1>
          <dl>
              <dt>총 수량</dt>
              <dd>{totalQuantity} 권</dd>
          </dl>
          <dl>
              <dt>총 금액</dt>
              <dd>{formatNumber(totalPrice)} 원</dd>
          </dl>
      </CartSummaryStyle>
  );
}

const CartSummaryStyle = styled.div<{ theme: Theme }>`
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;
    width: 100%;

    h1 {
        margin-bottom: 12px;
        font-size: 1.5rem;
        color: ${({ theme }) => theme.color.text};
    }

    dl {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;

        dt {
            font-weight: 500;
            color: ${({ theme }) => theme.color.secondary};
        }   
        dd {
            font-weight: 700;
            color: ${({ theme }) => theme.color.text};
        }     
    }
`;

export default CartSummary;