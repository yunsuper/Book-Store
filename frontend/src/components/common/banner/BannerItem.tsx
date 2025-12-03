import styled from 'styled-components';
import type { Banner as IBanner } from "../../../models/banner.model";
import type { Theme } from '../../../style/theme';

interface Props {
    banner: IBanner;
}

function BannerItem({ banner }: Props) {
    return (
        <BannerItemStyle>
            <div className="img">
                <img src={banner.image} alt={banner.title} />          
            </div>
            <div className="content">
                <h2>{banner.title}</h2>
                <p>{banner.description}</p>
            </div>
        </BannerItemStyle>
    );
}

const BannerItemStyle = styled.div<{ theme: Theme }>`
    flex: 0 0 100%;
    position: relative;

    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;

    .img {
        width: 100%;
        max-width: 100%;
    }

    .img img {
        width: 100%;
        height: 100%;
        object-fit: cover; /* ⭐ 매우 중요 */
    }

    .content {
        position: absolute;
        top: 0;
        left: 0;
        width: 40%;
        height: 100%;
        background: linear-gradient(
            to right,
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 0)
        );

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h2 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: ${({ theme }) => theme.color.primary};
        }

        p {
            font-size: 1.2rem;
            color: ${({ theme }) => theme.color.text};
            margin: 0;
        }
    }

    @media ${({ theme }) => theme.device.mobile} {
        .content {
            width: 100%;
            height: 50%; /* 필요하면 조정 가능 */
            bottom: 0;
            top: auto;

            background: linear-gradient(
                to top,
                rgba(255, 255, 255, 1),
                rgba(255, 255, 255, 0)
            );

            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            padding: 20px 12px;

            h2 {
                font-size: 1.5rem;
            }

            p {
                font-size: 0.75;
            }
        }

        .img img {
            height: auto;
            max-height: 280px;
            object-fit: cover;
        }
    }
`;

export default BannerItem;
