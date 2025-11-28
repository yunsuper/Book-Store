import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../api/auth.api";
import { useAlert } from "../hooks/useAlert";
import { SignupStyle } from "./Signup";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export interface SignupProps {
    email: string;
    password: string;
}

function Login() {
    const navigate = useNavigate();
    const showAlert = useAlert();

    const { isLoggedIn, storeLogin } = useAuthStore();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupProps>();

    const onSubmit = async (data: SignupProps) => {
    try {
        const res = await login(data);

        // Zustand 상태 업데이트
        storeLogin(res.token);

        // alert (UI 사이드 이펙트)
        showAlert("로그인 완료되었습니다.");

        // navigate는 마지막에!
        navigate("/");

    } catch (error) {
        showAlert("로그인이 실패했습니다.");
    }
};

    return (
        <>
            <Title size="large">로그인</Title>
            <SignupStyle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <InputText
                            placeholder="이메일"
                            inputType="email"
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <p className="error-text">이메일을 입력해주세요.</p>
                        )}
                    </fieldset>

                    <fieldset>
                        <InputText
                            placeholder="비밀번호"
                            inputType="password"
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <p className="error-text">
                                비밀번호를 입력해주세요.
                            </p>
                        )}
                    </fieldset>

                    <fieldset>
                        <Button type="submit" size="medium" schema="primary">
                            로그인
                        </Button>
                    </fieldset>

                    <div className="info">
                        <Link to="/reset">비밀번호 초기화</Link>
                    </div>
                </form>
            </SignupStyle>
        </>
    );
}

export default Login;
