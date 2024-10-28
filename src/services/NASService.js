import api from "utils/api";
import { toastError, toastSuccess } from "utils/toast";
import { qs } from "utils/utils";

export const getNAS = async (data) => {
    try {
        const response = await api.get(`/get-nas?${qs(data)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

export const getNASDetail = async (data) => {
    try {
        const response = await api.get(`/detail-nas?${qs(data)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

export const addNAS = async (data) => {
    try {
        const response = await api.post(`/add-nas`, data);
        if (response.status === 201) {
            toastSuccess(`${response?.data?.message}`)
            return response.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error.response.data.message };
    }
}

export const UpdateNAS = async (data, userId) => {
    try {
        const response = await api.put(`/update-nas/${userId}`, data);
        if (response.status === 200) {
            toastSuccess(`${response?.data?.message}`)
            return response.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error.response.data.message };
    }
}

export const deleteNAS = async (data) => {
    try {
        const response = await api.delete(`/delete-nas?${qs(data)}`);
        if (response?.status === 200) {
            toastSuccess(`${response?.data?.message}`)
            return response?.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error?.response?.data?.message };
    }
}