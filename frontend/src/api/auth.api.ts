import type { SignupProps } from "../pages/Signup";
import { httpClient } from "./http";

// ------------------------
// 회원가입
// ------------------------
export const signup = async (userData: SignupProps) => {
    const response = await httpClient.post("/users/join", userData);
    return response.data;
};

// ------------------------
// 비밀번호 초기화 요청 (email만 필요)
// ------------------------
export const resetRequest = async (data: { email: string }) => {
    const response = await httpClient.post("/users/reset", data);
    return response.data;
};

// ------------------------
// 비밀번호 재설정 (email + 새로운 password)
// ------------------------
export const resetPassword = async (data: {
    email: string;
    password: string;
}) => {
    const response = await httpClient.put("/users/reset", data);
    return response.data;
};

// ------------------------
// 로그인
// ------------------------
interface LoginResponse {
    success: boolean;
    user: { email: string };
    token: string;
}

export const login = async (data: { email: string; password: string }) => {
    const response = await httpClient.post("/users/login", data);

    // 🔥 토큰 저장!
    localStorage.setItem("token", response.data.token);

    return {
        success: true,
        user: {
            id: response.data.id,
            email: response.data.email,
        },
        token: response.data.token,
    };
};
