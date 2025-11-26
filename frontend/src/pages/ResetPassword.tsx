import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { resetPassword, resetRequest } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../hooks/useAlert";
import { SignupStyle } from "./Signup";
import { useState } from "react";


export interface SignupProps {
    email: string;
    password: string;
}

function ResetPassword() {
    const navigate = useNavigate();
    const showAlert = useAlert();
    const [resetRequested, setResetRequested] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<SignupProps>();

    const onSubmit = async (data: SignupProps) => {
        try {
            if (resetRequested) {
                // 2단계: 비밀번호 변경
                const res = await resetPassword({
                    email: getValues("email"), // 수정 방지
                    password: data.password,
                });

                showAlert(res.message || "비밀번호가 변경되었습니다.");
                navigate("/login");
            } else {
                // 1단계: 초기화 요청
                const res = await resetRequest({ email: data.email });

                showAlert(res.message || "초기화 메일을 전송했습니다.");
                setResetRequested(true);
            }
        } catch (error: any) {
            console.error(error);
            showAlert(error.response?.data?.message || "요청에 실패했습니다.");
        }
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
                            disabled={resetRequested} // 🔥 disable 처리
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

