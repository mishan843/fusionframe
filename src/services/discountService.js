import api from "utils/api";
import { qs } from "utils/utils";

export const getDiscounts = async (data) => {
    try {
        const response = await api.get(`/get-discounts?${qs(data)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

