import { useEffect, useState } from "react";
import { Category } from "../models/category.model";
import { fetchCategory } from "../api/category.api";
import { useSearchParams } from "react-router-dom";

export function useCategory(): {
    category: Category[];
    selectedCategory: number | null;
    isNews: boolean;
    changeCategory: (id: number | null) => void;
    toggleNews: () => void;
} {
    const [category, setCategory] = useState<Category[]>([]);
    const [params, setParams] = useSearchParams();

    const selectedCategory = params.get("category_id")
        ? Number(params.get("category_id"))
        : null;

    const isNews = params.get("news") === "true";

    useEffect(() => {
        fetchCategory().then((data) => {
            if (!data) return;

            // DB에서 불러온 category 그대로 사용
            // 예: [{id:0, name:'동화'}, {id:1, name:'소설'}, {id:2, name:'사회'}]

            // ⚠️ 여기서 순서를 강제해줌
            const displayOrder = ["동화", "소설", "사회"];

            const sorted = data.sort(
                (a, b) =>
                    displayOrder.indexOf(a.name) - displayOrder.indexOf(b.name)
            );

            // "전체"를 맨 앞에 추가
            setCategory([{ id: null, name: "전체" }, ...sorted]);
        });
    }, []);

    const changeCategory = (id: number | null) => {
        const next = new URLSearchParams(params);

        next.delete("news");

        if (id === null) next.delete("category_id");
        else next.set("category_id", String(id));

        setParams(next);
    };

    const toggleNews = () => {
        const next = new URLSearchParams(params);

        if (isNews) {
            next.delete("news");
        } else {
            next.set("news", "true");
            next.delete("category_id"); // ✅ 신간 켜지면 카테고리 해제
        }

        setParams(next);
    };

    return { category, selectedCategory, isNews, changeCategory, toggleNews };
}
