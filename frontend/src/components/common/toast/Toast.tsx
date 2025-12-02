import styled from 'styled-components';
import type { ToastItem } from '@/store/toastStore';
import { FaPlus, FaBan, FaCircleInfo } from "react-icons/fa6";
import {  useState, type ComponentType } from "react";
import type { Theme } from '../../../style/theme';
import useToastStore from '@/store/toastStore';
import { useTimeout } from '../../../hooks/useTimeout';

const InfoIcon = FaCircleInfo as unknown as ComponentType;
const SuccessIcon = FaPlus as unknown as ComponentType;
const ErrorIcon = FaBan as unknown as ComponentType;

export const TOAST_REMOVE_DELAY = 3000;

function Toast({ id, message, type }: ToastItem) {
    const MessageText = styled.span``;
    const removeToast = useToastStore((state) => state.removeToast);
    const [isFadingOut, setIsFadingOut] = useState(false);

    const handleRemoveToast =() =>{
        setIsFadingOut(true);
    }

    useTimeout(() => {
        removeToast(id);
    }, TOAST_REMOVE_DELAY);

    return (
        <ToastStyle
            className={isFadingOut ? "fade-out" : "fade-in"}
            onAnimationEnd={() => {
                if (isFadingOut) removeToast(id);
            }}
        >
            <p>
                {type === "info" && <InfoIcon />}
                {type === "success" && <InfoIcon />}
                {type === "error" && <ErrorIcon />}
            </p>
            <MessageText>{message}</MessageText>
            <button onClick={handleRemoveToast}>
                <SuccessIcon />
            </button>
        </ToastStyle>
    );
}

const ToastStyle = styled.div<{ theme: Theme }>`
    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes fade-out {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    &.fade-in {
        animation: fade-in 0.3s ease-in-out forwards;
    }
    &.fade-out {
        animation: fade-out 0.3s ease-in-out forwards;
    }

    background-color: ${({ theme }) => theme.color.background};
    padding: 12px;
    border-radius: ${({ theme }) => theme.borderRadius.default};

    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 24px;
    opacity: 0;
    transition: all 0.3s ease-in-out;

    p {
        color: ${({ theme }) => theme.color.text};
        line-height: 1;
        margin: 0;
        flex: 1;

        display: flex;
        align-items: end;
        gap: 4px;
    }

    button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        margin: 0;

        svg {
            transform: rotate(45deg);
        }
    }
`;

export default Toast;
