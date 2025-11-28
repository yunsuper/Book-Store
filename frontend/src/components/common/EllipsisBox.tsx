import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { FaAngleDown } from "react-icons/fa";

const AngleDownIcon = FaAngleDown as unknown as React.ComponentType;


interface Props {
    children: React.ReactNode;
    $linelimit: number;
}

function EllipsisBox({ children, $linelimit }: Props) {
    const [expanded, setExpanded] = useState(true);


    return (
        <EllipsisBoxStyle $linelimit={$linelimit} $expanded={expanded}>
            <p>{children}</p>
            <div className="toggle">
                <Button
                    size="small"
                    schema="normal"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? '접기' : '펼치기'} <AngleDownIcon />
                </Button>
            </div>
        </EllipsisBoxStyle>
    );
}

interface EllipsisBoxStyleProps {
    $linelimit: number;
    $expanded: boolean;
}


const EllipsisBoxStyle = styled.div<EllipsisBoxStyleProps>`
    p {
        overflow-y: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: ${({ $linelimit, $expanded }) =>
            $expanded ? "none" : $linelimit};
        -webkit-box-orient: vertical;
        padding: 20px 0 0 0;
        margin: 0;
    }

    .toggle {
        display: flex;
        justify-content: flex-end;
        & svg {
            transform: ${({ $expanded }) =>
                $expanded ? "rotate(180deg)" : "rotate(0)"};
            transition: transform 0.2s ease;
        }
    }
`;

export default EllipsisBox;