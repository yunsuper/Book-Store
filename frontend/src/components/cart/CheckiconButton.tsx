import styled from "styled-components";
import { type Theme } from "../../style/theme";
import { FaRegCircle, FaRegCircleCheck } from "react-icons/fa6";

const Circleicon = FaRegCircle as unknown as React.ComponentType;
const CircleCheckicon = FaRegCircleCheck as unknown as React.ComponentType;

interface Props{
    isChecked: boolean;
    onCheck: () => void;
};

function CheckIconButton({isChecked, onCheck}: Props) {
    return (
        <CheckIconButtonStyle onClick={onCheck}>
            {isChecked ? <CircleCheckicon /> : <Circleicon />}
        </CheckIconButtonStyle>
    );
}

const CheckIconButtonStyle = styled.button<{ theme: Theme }>`
    background: none;
    border: none;
    cursor: pointer;

    svg {
        width: 24px;
        height: 24px;
        color: ${({ theme }) => theme.color.primary};
    }
`;

export default CheckIconButton;