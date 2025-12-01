import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignupStyle } from "./Signup";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export interface SignupProps {
    email: string;
    password: string;
}

function ResetPassword() {
    const [resetRequested, setResetRequested] = useState(false);
    const { resetRequestHandler, resetPasswordHandler } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<SignupProps>();

    const onSubmit = async (data: SignupProps) => {
        const email = getValues("email");

        if (!resetRequested) {
            const ok = await resetRequestHandler(email);
            if (ok) setResetRequested(true); 
            return;
        }

        await resetPasswordHandler(email, data.password);
    };

    return (
        <>
            <Title size="large">비밀번호 초기화</Title>

            <SignupStyle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <InputText
                            placeholder="이메일"
                            inputType="email"
                            disabled={resetRequested}
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <p className="error-text">이메일을 입력해주세요.</p>
                        )}
                    </fieldset>

                    {resetRequested && (
                        <fieldset>
                            <InputText
                                placeholder="새 비밀번호"
                                inputType="password"
                                {...register("password", {
                                    required: true,
                                    minLength: 4,
                                })}
                            />
                            {errors.password && (
                                <p className="error-text">
                                    4글자 이상 입력해주세요.
                                </p>
                            )}
                        </fieldset>
                    )}

                    <fieldset>
                        <Button type="submit" size="medium" schema="primary">
                            {resetRequested ? "비밀번호 변경" : "초기화 요청"}
                        </Button>
                    </fieldset>

                    <div className="info">
                        <Link to="/login">로그인 화면으로</Link>
                    </div>
                </form>
            </SignupStyle>
        </>
    );
}

export default ResetPassword;
