import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "../api/category.api";
import type { Category } from "../models/category.model";

export function useCategory() {
    const [params, setParams] = useSearchParams();

    const selectedCategory = params.get("category_id")
        ? Number(params.get("category_id"))
        : null;

    const isNews = params.get("news") === "true";

    const {
        data: categoryData = [],
        isLoading,
        isError,
        error,
    } = useQuery<Category[]>({
        queryKey: ["category"],
        queryFn: fetchCategory,
        staleTime: 1000 * 60 * 5, // 5분 캐싱
    });

    const displayOrder = ["동화", "소설", "사회"];

    const category = [
        { id: null, name: "전체" },
        ...categoryData.sort(
            (a, b) =>
                displayOrder.indexOf(a.name) - displayOrder.indexOf(b.name)
        ),
    ];

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
            next.delete("category_id"); 
        }

        setParams(next);
    };

    return {
        category,
        selectedCategory,
        isNews,
        changeCategory,
        toggleNews,
        isLoading,
        isError,
        error,
    };
}
