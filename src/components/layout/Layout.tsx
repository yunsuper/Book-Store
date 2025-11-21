import type { Theme } from "../../style/theme";
import styled from "styled-components";
import Footer from "../common/Footer";
import Header from "../common/Header";

interface LayoutProps{
    children: React.ReactNode;
}

function Layout({children}: LayoutProps){
    return (
        <LayoutStyle>
            <Header />
            <Main>{children}</Main>
            <Footer />
        </LayoutStyle>
    );
}

const LayoutStyle = styled.main<{ theme: Theme }>`
    width: 100%;
    margin: 0 auto;
    max-width: ${({ theme }) => theme.layout.large.width};
    padding: 20px 0;
`;

const Main = styled.main<{ theme: Theme }>`
    padding: 20px 0;
`;

export default Layout;