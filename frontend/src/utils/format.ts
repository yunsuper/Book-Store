import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const formatNumber = (value?: number | null) => {
    const safeValue = value ?? 0; // undefined/null → 0으로 처리
    return safeValue.toLocaleString();
};

export const formatDate = (
    date: string | Date,
    format= "YYYY년 MM월 DD일"
) => {
    return dayjs(date, "YYYY-MM-DD HH:mm:ss").format(format);
};