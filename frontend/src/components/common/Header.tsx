import styled from "styled-components";
import { type Theme } from "../../style/theme";
import logo from "../../assets/images/logo.png";
import {FaRegUser, FaSignInAlt} from 'react-icons/fa';
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";
import { useAuthStore } from "../../store/authStore";
import Dropdown from "./Dropdown";
import ThemeSwithcer from "../header/ThemeSwitcher";

const SignInIcon = FaSignInAlt as unknown as React.FC;
const UserIcon = FaRegUser as unknown as React.FC;
const UserIcons = FaCircleUser as unknown as React.ComponentType<
    React.SVGProps<SVGSVGElement>
>;

function Header(){
    const {category} = useCategory();
    const { isLoggedIn, storeLogout: storelogout} = useAuthStore();
    return (
        <HeaderStyle>
            <h1 className="logo">
                <LogoWrapper>
                    <Link to="/">
                        <img src={logo} alt="book store" />
                    </Link>
                </LogoWrapper>
            </h1>
            <nav className="category">
                <ul>
                    {category.map((item, index) => (
                        <li key={item.id === null ? `all-${index}` : item.id}>
                            <Link
                                to={{
                                    pathname: "/books",
                                    search:
                                        item.id === null
                                            ? ""
                                            : `?category_id=${item.id}`,
                                }}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <nav className="auth">
                <Dropdown toggleButton={<UserIcons />}>
                    <>
                        {isLoggedIn && (
                            <ul>
                                <li>
                                    <Link to="/cart">장바구니</Link>
                                </li>
                                <li>
                                    <Link to="/orderlist">주문 내역</Link>
                                </li>
                                <li>
                                    <button onClick={storelogout}>
                                        로그아웃
                                    </button>
                                </li>
                            </ul>
                        )}
                        {!isLoggedIn && (
                            <ul>
                                <li>
                                    <Link to="/login">
                                        <SignInIcon />
                                        로그인
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signup">
                                        <UserIcon />
                                        회원가입
                                    </Link>
                                </li>
                            </ul>
                        )}
                        <ThemeSwithcer />
                    </>
                </Dropdown>
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
            flex-direction: column;
            gap: 16px;
            width: 100px;

            li {
                a, button {
                    font-size: 1.2rem;
                    font-weight: 600;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    line-height: 1;
                    background: none;
                    border: 0;
                    cursor: pointer;
                    color: ${({ theme }) => theme.color.text};

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