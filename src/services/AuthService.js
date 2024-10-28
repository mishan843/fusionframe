import { toastError, toastSuccess } from "utils/toast";
import api from "../utils/api";
import { qs } from "utils/utils";

export const login = async (data) => {
    try {
        const response = await api.post('/login', data);
        if (response.status === 200) {
            toastSuccess(`${response?.data?.message}`)
            return response.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error.response.data.message };
    }
}
export const resellerLogin = async (data) => {
    try {
        const response = await api.post('/reseller-login', data);
        if (response.status === 200) {
            toastSuccess(`${response?.data?.message}`)
            return response.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error.response.data.message };
    }
}

export const getNewRequest = async (data) => {
    try {
        const response = await api.get(`/login-activity?${qs(data)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

export const sendForgotEmail = async (data) => {
    try {
        const response = await api.post(`/forgot-password`, data);
        if (response?.status === 200) {
            toastSuccess(`${response?.data?.message}`)
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

export const updatePassword = async (data) => {
    try {
        const response = await api.post(`/reset-password`, data);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error?.response?.data?.message };
    }
}