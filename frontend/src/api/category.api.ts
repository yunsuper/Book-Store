import type { Category } from "../models/category.model";
import { httpClient } from "./http";

export const fetchCategory = async (): Promise<Category[]> => {
    try {
        const response = await httpClient.get<Category[]>("/category");
        console.log("🔥 fetchCategory response:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ fetchCategory error:", error);
        return [];
    }
};
