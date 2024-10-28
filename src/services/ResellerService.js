import api from "utils/api";
import { toastError, toastSuccess } from "utils/toast";
import { qs } from "utils/utils";

export const getReseller = async (data) => {
    try {
        const response = await api.get(`/get-reseller?${qs(data)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

export const addReseller = async (data) => {
    try {
        const response = await api.post(`/add-reseller`, data);
        if (response.status === 201) {
            toastSuccess(`${response?.data?.message}`)
            return response.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error.response.data.message };
    }
}

export const UpdateReseller = async (data, params) => {
    try {
        const response = await api.put(`/update-reseller/${params}`, data);
        if (response.status === 200) {
            toastSuccess(`${response?.data?.message}`)
            return response.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error.response.data.message };
    }
}

export const getResellerDetail = async (data) => {
    try {
        const response = await api.get(`/detail-reseller?${qs(data)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

export const deleteReseller = async (data) => {
    try {
        const response = await api.delete(`/delete-reseller?${qs(data)}`);
        if (response?.status === 200) {
            toastSuccess(`${response?.data?.message}`)
            return response?.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error?.response?.data?.message };
    }
}

export const deleteResellerEMP = async (data) => {
    try {
        const response = await api.delete(`/deleteReseller-employee`, { data });
        if (response?.status === 200) {
            toastSuccess(`${response?.data?.message}`)
            return response?.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error?.response?.data?.message };
    }
}

export const addResellerEMP = async (data) => {
    try {
        const response = await api.post(`/addReseller-employee`, data);
        if (response.status === 201) {
            toastSuccess(`${response?.data?.message}`)
            return response.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error.response.data.message };
    }
}

export const UpdateResellerEMP = async (data) => {
    try {
        const response = await api.post(`/updateReseller-employee`, data);
        if (response.status === 200) {
            toastSuccess(`${response?.data?.message}`)
            return response.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error.response.data.message };
    }
}