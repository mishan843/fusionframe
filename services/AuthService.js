import api from "../utils/api";

export const login = async (data) => {
    try {
        const response = await api.post('/user/login', data);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        return { error: error.response.data.message };
    }
}

export const addUser = async (data) => {
    try {
        const response = await api.post('/user/create', data);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        return { error: error.response.data.message };
    }
}