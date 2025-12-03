import { useEffect, useState } from "react";
import { light } from "@/style/theme"; // ★ 반드시 가져와야 함

export type MediaType = "mobile" | "tablet" | "desktop";

const extractNumber = (str: string): number => {
    return Number(str.replace(/\D/g, ""));
};

export function useMediaQuery(): MediaType {
    const MOBILE_MAX = extractNumber(light.device.mobile);
    const TABLET_MAX = extractNumber(light.device.tablet);

    const getDeviceType = () => {
        const width = window.innerWidth;

        if (width <= MOBILE_MAX) return "mobile";
        if (width <= TABLET_MAX) return "tablet";
        return "desktop";
    };

    const [device, setDevice] = useState<MediaType>(() => {
        if (typeof window === "undefined") return "desktop";
        return getDeviceType();
    });

    useEffect(() => {
        const getDeviceType = () => {
            const width = window.innerWidth;

            if (width <= MOBILE_MAX) return "mobile";
            if (width <= TABLET_MAX) return "tablet";
            return "desktop";
        };

        const handleResize = () => setDevice(getDeviceType());

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [MOBILE_MAX, TABLET_MAX]);

    return device;
}
