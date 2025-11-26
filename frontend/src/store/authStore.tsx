import { create } from "zustand";

interface StoreState {
    isLoggedIn: boolean;
    storeLogin: (token: string) => void;
    storeLogout: () => void;
}

export const getToken = () => {
    return localStorage.getItem("token");
};

const setToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const removeToken = () => {
    localStorage.removeItem("token");
};

export const useAuthStore = create<StoreState>((set) => ({
    isLoggedIn: !!getToken(),

    storeLogin: (token: string) => {
        setToken(token);
        set({ isLoggedIn: true });
    },

    storeLogout: () => {
        removeToken();
        set({ isLoggedIn: false });
    },
}));
