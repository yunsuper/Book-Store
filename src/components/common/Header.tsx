import styled from "styled-components";
import { type Theme } from "../../style/theme";
import logo from "../../assets/images/logo.png";
import { text } from "stream/consumers";
import {FaRegUser, FaSignInAlt} from 'react-icons/fa';

const SignInIcon = FaSignInAlt as unknown as React.FC;
const UserIcon = FaRegUser as unknown as React.FC;

const CATEGORY = [
    {
        id: null,
        name: "전체",
    },
    {
        id: 0,
        name: "동화",
    },
    {
        id: 1,
        name: "소설",
    },
    {
        id: 2,
        name: "사회",
    },
];

function Header(){
    return (
        <HeaderStyle>
            <h1 className="logo">
                <LogoWrapper>
                    <img src={logo} alt="book store" />
                </LogoWrapper>
            </h1>
            <nav className="category">
                <ul>
                    {CATEGORY.map((item) => (
                        <li key={item.id}>
                            <a
                                href={
                                    item.id === null
                                        ? `/books`
                                        : `/books?category=${item.id}`
                                }
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <nav className="auth">
                <ul>
                    <li>
                        <a href="/login">
                            <SignInIcon />
                            로그인
                        </a>
                    </li>
                    <li>
                        <a href="/login">
                            <UserIcon />
                            회원가입
                        </a>
                    </li>
                </ul>
            </nav>
        </HeaderStyle>
    );
}

const HeaderStyle = styled.header<{ theme: Theme }>`
    width: 100%;
    margin: 0 auto;
    max-width: ${({ theme }) => theme.layout.large.width};

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid ${({ theme }) => theme.color.background};

    .logo {
        img {
            width: 200px;
        }
    }

    .category {
        ul {
            display: flex;
            gap: 20px;

            li {
                a {
                    font-size: 1.5rem;
                    font-weight: 600;
                    text-decoration: none;
                    color: ${({ theme }) => theme.color.text};

                    &:hover {
                        color: ${({ theme }) => theme.color.primary};
                    }
                }
            }
        }
    }

    .auth {
        ul {
            display: flex;
            gap: 16px;

            li {
                a {
                    font-size: 1.2rem;
                    font-weight: 600;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    line-height: 1;

                    svg{
                        margin-right: 6px;
                    }
                }
            }
        }
    }
`;


const LogoWrapper = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;

    img {
        width: 54px;
        height: 54px;
        object-fit: contain;
    }
`;



export default Header;