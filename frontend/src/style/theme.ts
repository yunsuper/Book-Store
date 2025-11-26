export type ThemeName = "light" | "dark";
export type ColorKey = "primary" | "background" | "secondary" | "third" | "border" | "text";
export type HeadingSize = "small" | "medium" | "large";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonSchema = "primary" | "normal";
export type LayoutWidth = "large" | "medium" | "small";

export interface Theme {
    name: string;
    color: Record<ColorKey, string>;
    heading:{
        [key in HeadingSize]: {
            fontsize: string};
    };
    button: {
        [key in ButtonSize]: {
            fontsize: string;
            padding: string;
        }
    };
    buttonSchema: {
        [key in ButtonSchema]: {
            backgroundColor: string;
            color: string;
        }
    };
    borderRadius?: {
        default: string;
    };
    layout:{
        [key in LayoutWidth]: {
            width: string;
        }
    };
}

export const light: Theme = {
    name: "light",
    color: {
        primary: "#ff5800",
        background: "#5f5f5f",
        secondary: "#555",
        third: "green",
        border: "gray",
        text: "black",
    },
    heading: {
        large: {
            fontsize: "2rem",
        },
        medium: {
            fontsize: "1.5rem",
        },
        small: {
            fontsize: "1rem",
        },
    },
    button: {
        large: {
            fontsize: "1.5rem",
            padding: "1rem 2rem",
        },
        medium: {
            fontsize: "1rem",
            padding: "0.5rem 1rem",
        },
        small: {
            fontsize: "0.75rem",
            padding: "0.25rem 0.5rem",
        },
    },
    buttonSchema: {
        primary: {
            backgroundColor: "midnightblue",
            color: "white",
        },
        normal: {
            backgroundColor: "lightgray",
            color: "black",
        },
    },
    borderRadius: {
        default: "4px",
    },
    layout: {
        large: {
            width: "1020px",
        },
        medium: {
            width: "760px",
        },
        small: {
            width: "320px",
        },
    },
};

export const dark: Theme = {
    ...light,
    name: "dark",
    color: {
        primary: "coral",
        background: "midnightblue",
        secondary: "#87CEFA",
        third: "darkgreen",
        border: "gray",
        text: "white",
    },
};

export const getTheme = (themeName: ThemeName): Theme => {
    switch (themeName) {
        case "light":
            return light;
        case "dark":
            return dark;
    }
};