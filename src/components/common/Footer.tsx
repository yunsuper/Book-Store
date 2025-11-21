import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { type Theme } from "../../style/theme";

function Footer() {
    return (
        <FooterStyle>
                <LogoWrapper>
                    <img src={logo} alt="book store" />
                </LogoWrapper>
                
                <div className="copyright">
                    <p>
                        copyright © 2025 Book Store.
                    </p>
                </div>
        </FooterStyle>
    );    
}

const FooterStyle = styled.footer<{ theme: Theme }>`
    width: 100%;
    margin: 0 auto;
    max-width: ${({ theme }) => theme.layout.large.width};
    border-top: 1px solid ${({ theme }) => theme.color.background};
    padding: 20px 0;
    display: flex;
    justify-content: space-between;

    .logo {
        img{
            width: 140px;
        }
    }

    .copyright {
        p {
            font-size: 0.75rem;
            color: ${({ theme }) => theme.color.text};
        }
    }
`;

const LogoWrapper = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;

    img {
        width: 32px;
        height: 32px;
        object-fit: contain;
    }
`;

export default Footer;
