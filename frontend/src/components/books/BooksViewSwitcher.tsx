import { useEffect, type ReactElement } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { QUERYSTRING } from "../../constants/querystring";
import Button from "../common/Button";

const { FaList } = require("react-icons/fa");
const { BsGrid } = require("react-icons/bs");

interface ViewOption {
    value: string;
    icon: () => ReactElement;
}

export type ViewMode = "grid" | "list";

const viewOptions: ViewOption[] = [
    { value: "list", icon: () => <FaList /> },
    { value: "grid", icon: () => <BsGrid /> },
];

function BooksViewSwitcher() {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSwitch = (value: string) => {
        const newSearchParams = new URLSearchParams(searchParams);

        newSearchParams.set(QUERYSTRING.VIEW, value);
        setSearchParams(newSearchParams);
    };

    useEffect(() => {
        if (!searchParams.get(QUERYSTRING.VIEW)) {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set(QUERYSTRING.VIEW, "grid");
            setSearchParams(newSearchParams);
        }
    }, [searchParams, setSearchParams]);

    return (
        <BooksViewSwitcherStyle>
            {viewOptions.map((option) => {
                const Icon = option.icon;
                return (
                    <Button
                        key={option.value}
                        size="medium"
                        schema={
                            searchParams.get(QUERYSTRING.VIEW) === option.value
                                ? "primary"
                                : "normal"
                        }
                        onClick={() => handleSwitch(option.value)}
                    >
                        <Icon />
                    </Button>
                );
            })}
        </BooksViewSwitcherStyle>
    );
}

const BooksViewSwitcherStyle = styled.div`
    display: flex;
    gap: 8px;
    svg {
        fill: #fff;
    }
`;

export default BooksViewSwitcher;
