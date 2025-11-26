import styled from "styled-components";
import  { HeadingSize, type ColorKey, type Theme}  from "../../style/theme";

interface Props {
    children: React.ReactNode;
    size: HeadingSize;
    color?: ColorKey;
}

function Title({children, size, color}: Props) {
  return(
    <TitleStyle size={size} color={color}>
        {children}
    </TitleStyle>
  )
}

const TitleStyle = styled.h1<{ size: HeadingSize; color?: ColorKey; theme: Theme}>`
    font-size: ${({ theme, size }) => theme.heading[size].fontsize};
    color: ${({ theme, color }) =>
        color ? theme.color[color] : theme.color.primary};
`;   

export default Title;