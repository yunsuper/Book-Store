import type { LoginProps } from "../pages/Login";
import { useAuthStore } from "../store/authStore";
import { login, signup, resetRequest, resetPassword } from "@/api/auth.api"; 
import { useAlert } from "./useAlert";
import { useNavigate } from "react-router-dom";
import type { SignupProps } from "../pages/Signup";

export const useAuth = () => {
    const { isLoggedIn, storeLogin, storeLogout } = useAuthStore();
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const loginHandler = async (data: LoginProps) => {
        try {
            const res = await login(data);

            storeLogin(res.token);

            showAlert("로그인 완료되었습니다.");

            navigate("/");
        } catch (error) {
            showAlert("로그인이 실패했습니다.");
        }
    };

    const signupHandler = async (data: SignupProps) => {
        try {
            await signup(data); // 토큰 저장 필요 없음
            showAlert("회원가입이 완료되었습니다.");
            navigate("/login");
        } catch (error: any) {
            console.error(error);
            showAlert(
                error.response?.data?.message || "회원가입에 실패했습니다."
            );
        }
    };

    const resetRequestHandler = async (email: string) => {
        try {
            const res = await resetRequest({ email });
            showAlert(res.message || "초기화 메일을 전송했습니다.");
            return true; // 요청 성공
        } catch (error: any) {
            showAlert(error.response?.data?.message || "요청에 실패했습니다.");
            return false;
        }
    };

    const resetPasswordHandler = async (email: string, password: string) => {
        try {
            const res = await resetPassword({ email, password });
            showAlert(res.message || "비밀번호가 변경되었습니다.");
            navigate("/login");
        } catch (error: any) {
            showAlert(error.response?.data?.message || "요청에 실패했습니다.");
        }
    };

    return {
        isLoggedIn,
        loginHandler,
        signupHandler,
        resetRequestHandler,
        resetPasswordHandler,
        storeLogout,
    };
};
