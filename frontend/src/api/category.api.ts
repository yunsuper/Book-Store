import type { Category } from "../models/category.model";
import { httpClient } from "./http";

export const fetchCategory = async (): Promise<Category[]> => {
    try {
        const response = await httpClient.get<Category[]>("/category");
        return response.data;
    } catch (error) {
        console.error("❌ fetchCategory error:", error);
        return [];
    }
};
