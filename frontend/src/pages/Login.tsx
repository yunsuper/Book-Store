import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignupStyle } from "./Signup";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export interface LoginProps {
    email: string;
    password: string;
}

function Login() {
    const navigate = useNavigate();
    const { isLoggedIn, loginHandler } = useAuth(); // ⭐  useAuth 사용

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginProps>();

    const onSubmit = (data: LoginProps) => {
        loginHandler(data); // ⭐ 훅에서 처리
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
                            inputMode="email"
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
                            inputMode="text"
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
