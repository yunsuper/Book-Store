import { useEffect, useRef } from "react";

type Callback = (entries: IntersectionObserverEntry[]) => void;

interface ObserverOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}

export const useIntersectionObserver = (
    callback: Callback,
    options?: ObserverOptions
) => {
    const targetRef = useRef<Element | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(callback, options);

        const element = targetRef.current; // ⭐ cleanup 안전하게 ref 저장

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
            observer.disconnect();
        };
    }, [callback, options]);

    return targetRef;
};

export default useIntersectionObserver;
