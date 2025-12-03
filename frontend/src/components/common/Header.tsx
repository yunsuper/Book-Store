import styled from "styled-components";
import { type Theme } from "../../style/theme";
import logo from "../../assets/images/logo.png";
import {FaRegUser, FaSignInAlt, FaBars, FaAngleRight} from 'react-icons/fa';
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";
import { useAuthStore } from "../../store/authStore";
import Dropdown from "./Dropdown";
import ThemeSwithcer from "../header/ThemeSwitcher";
import { useState } from "react";

const SignInIcon = FaSignInAlt as unknown as React.FC;
const UserIcon = FaRegUser as unknown as React.FC;
const UserIcons = FaCircleUser as unknown as React.ComponentType<
    React.SVGProps<SVGSVGElement>
>;
const MenuButton = FaBars as unknown as React.FC;
const AngleRight = FaAngleRight as unknown as React.FC;


function Header(){
    const {category} = useCategory();
    const { isLoggedIn, storeLogout: storelogout} = useAuthStore();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    return (
        <HeaderStyle $isOpen={isMobileOpen}>
            <h1 className="logo">
                <LogoWrapper>
                    <Link to="/">
                        <img src={logo} alt="book store" />
                    </Link>
                </LogoWrapper>
            </h1>
            <nav className="category">
                <button className="menu-button" onClick={() => setIsMobileOpen(!isMobileOpen)}>
                    {isMobileOpen ? <AngleRight /> : <MenuButton />}                       
                </button>

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

interface HeaderStyleProps {
    $isOpen: boolean;
}

const HeaderStyle = styled.header<{ theme: Theme } & HeaderStyleProps>`
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
        .menu-button {
            display: none;
        }

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
                a,
                button {
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

                    svg {
                        margin-right: 6px;
                    }
                }
            }
        }
    }

    @media ${({ theme }) => theme.device.mobile} {
        max-width: 100%;
        padding: 8px 12px;
        height: 52px;

        .logo {
            padding: 0 0 0 12px;

            img {
                width: 140px;
            }
        }

        .auth {
            position: absolute;
            top: 12px;
            right: 12px;
        }

        .category {
            .menu-button {
                display: flex;
                position: absolute;
                top: 14px;
                right: ${({ $isOpen }) => ($isOpen ? "62%" : "52px")};
                background: #fff;
                border: 0;
                font-size: 1.5rem;
            }

            ul {
                position: fixed;
                top: 0;
                right: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
                width: 60%;
                height: 100vh;
                background: #fff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                transition: right 0.3s ease-in-out;

                margin: 0;
                padding: 24px;
                z-index: 1000;

                flex-direction: column;
                gap: 16px;
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