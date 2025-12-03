import styled from "styled-components";
import type { Banner as IBanner } from "../../../models/banner.model";
import BannerItem from "./BannerItem";
import { useMemo, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import type { Theme } from "../../../style/theme";

const PrevIcon = FaAngleLeft as unknown as React.ComponentType;
const NextIcon = FaAngleRight as unknown as React.ComponentType;

interface Props {
    banners: IBanner[];
}

function Banner({ banners }: Props) {
    const [currentIndex, setCurrnetIndex] = useState(0);

    const transFormValue = useMemo(() => {
        return currentIndex * -100;
    }, [currentIndex]);

    const handlePrev = () => {
        if (currentIndex === 0) return;
        setCurrnetIndex(currentIndex - 1);
    };
    const handleNext = () => {
        if (currentIndex === banners.length - 1) return;
        setCurrnetIndex(currentIndex + 1);
    };

    const handleIndicatorClick = (index: number) => {
        setCurrnetIndex(index);
    };

    return (
        <BannerStyle>
            <BannerContainerStyle $transFormValue={transFormValue}>
                {banners.map((item, index) => (
                    <BannerItem banner={item} />
                ))}
            </BannerContainerStyle>

            <BannerButtonStyle>
                <button className="prev" onClick={handlePrev}>
                    <PrevIcon />
                </button>
                <button className="next" onClick={handleNext}>
                    <NextIcon />
                </button>
            </BannerButtonStyle>
            <BannerIndicatorStyle>
                {banners.map((_, index) => (
                    <span
                        className={index === currentIndex ? "active" : ""}
                        key={index}
                        onClick={() => handleIndicatorClick(index)}
                    ></span>
                ))}
            </BannerIndicatorStyle>
        </BannerStyle>
    );
}

const BannerStyle = styled.div`
    overflow: hidden;
    position: relative;
`;

interface BannerContainerStyleProps {
    $transFormValue: number;
}

const BannerContainerStyle = styled.div<BannerContainerStyleProps>`
    display: flex;
    transform: translateX(${(props) => props.$transFormValue}%);
    transition: transform 0.5s ease-in-out;
`;

const BannerButtonStyle = styled.div<{ theme: Theme }>`
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    transform: translateY(-50%);

    button {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        background: rgba(0, 0, 0, 0.5);
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        svg {
            fill: #fff;
        }

        @media ${({ theme }) => theme.device.mobile}{
            width: 28px;
            height: 28px;
            font-size: 1.5rem;

            &.prev{
                left: 0;
            }

            &.next{
                right: 0;
            }
        }
    }
`;

const BannerIndicatorStyle = styled.div<{ theme: Theme }>`
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);

    span {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 100px;
        background: #fff;
        margin: 0 4px;
        cursor: pointer;

        &.active {
            background: ${({ theme }) => theme.color.primary};
        }
    }

    @media ${({ theme }) => theme.device.mobile}{
        bottom: 0;
        span {
            width: 12px;
            height: 12px;

            &.active{
                width: 24px;
            }
        }
    }
`;

export default Banner;
