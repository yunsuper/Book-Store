import React from "react";
import styled from "styled-components";
import  { type Theme } from "../../style/theme";

interface Props{
    placeholder?: string;
}

const InputText = React.forwardRef(
    (placeholder: Props, ref: React.Ref<HTMLInputElement>) => {
        return <InputTextStyle placeholder={placeholder.placeholder} ref={ref} />;
    }
);

const InputTextStyle = styled.input.attrs({ type: "text" })<{
    theme: Theme;
}>`
    padding: 0.25rem 0.75rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    font-size: 1rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.color.text};
`;

export default InputText;