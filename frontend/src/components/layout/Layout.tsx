import type { Theme } from "../../style/theme";
import styled from "styled-components";
import Footer from "../common/Footer";
import Header from "../common/Header";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <LayoutStyle>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </LayoutStyle>
    );
}

const LayoutStyle = styled.div<{ theme: Theme }>`
    width: 100%;
    margin: 0 auto;
    max-width: ${({ theme }) => theme.layout.large.width};
    padding: 20px 0;
`;


export default Layout;