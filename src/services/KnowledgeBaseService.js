import api from "utils/api";
import { toastError, toastSuccess } from "utils/toast";
import { qs } from "utils/utils";

export const getKnowledgeBase = async (data) => {
    try {
        const response = await api.get(`/get-knowledges?${qs(data)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

export const addKnowledgeBase = async (data) => {
    try {
        const response = await api.post(`/add-knowledge`, data);
        if (response.status === 201) {
            toastSuccess(`${response?.data?.message}`)
            return response.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error.response.data.message };
    }
}

export const UpdateKnowledgeBase = async (data, params) => {
    try {
        const response = await api.put(`/update-knowledge/${params}`, data);
        if (response.status === 200) {
            toastSuccess(`${response?.data?.message}`)
            return response.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error.response.data.message };
    }
}

export const getKnowledgeBaseDetail = async (data) => {
    try {
        const response = await api.get(`/get-knowledge?${qs(data)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

export const deleteKnowledgeBase = async (data) => {
    try {
        const response = await api.delete(`/delete-knowledge?${qs(data)}`);
        if (response?.status === 200) {
            toastSuccess(`${response?.data?.message}`)
            return response?.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error?.response?.data?.message };
    }
}