import styled from "styled-components";
import type { ButtonSchema, ButtonSize, Theme } from "../../style/theme";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    size: ButtonSize;
    schema: ButtonSchema;
    disabled?: boolean;
    isLoading?: boolean;
}

function Button({children, size, schema, disabled, isLoading, ...props}: Props) {
    return (
        <ButtonStyle
            $size={size}
            $schema={schema}
            disabled={disabled}
            $isLoading={isLoading}
            {...props}
        >
            {children}
        </ButtonStyle>
    );
}

const ButtonStyle = styled.button<{
    $size: ButtonSize;
    $schema: ButtonSchema;
    disabled?: boolean;
    $isLoading?: boolean;
    theme: Theme;
}>`
    font-size: ${({ theme, $size }) => theme.button[$size].fontsize};
    padding: ${({ theme, $size }) => theme.button[$size].padding};
    color: ${({ theme, $schema }) => theme.buttonSchema[$schema].color};
    background-color: ${({ theme, $schema }) =>
        theme.buttonSchema[$schema].backgroundColor};
    border: 0;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    opacity: ${({ disabled, $isLoading }) => (disabled || $isLoading ? 0.5 : 1)};
    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
    cursor: pointer;
`;

export default Button;