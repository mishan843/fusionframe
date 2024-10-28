import api from "utils/api";
import { toastError, toastSuccess } from "utils/toast";
import { qs } from "utils/utils";

export const getSubscriber = async (data) => {
    try {
        const response = await api.get(`/get-subscriber?${qs(data)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

export const addSubscriber = async (data) => {
    try {
        const response = await api.post(`/add-subscriber`, data);
        if (response.status === 201) {
            toastSuccess(`${response?.data?.message}`)
            return response.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
    return { error: error.response.data.message };
    }
}

export const UpdateSubscriber = async (data, userId) => {
    try {
        const response = await api.put(`/update-subscriber/${userId}`, data);
        if (response.status === 200) {
            toastSuccess(`${response?.data?.message}`)
            return response.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error.response.data.message };
    }
}

export const getSubscriberDetail = async (data) => {
    try {
        const response = await api.get(`/detail-subscriber?${qs(data)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

export const deleteSubscribers = async (data) => {
    try {
        const response = await api.post(`/delete-multiple-subscriber`, data);
        if (response.status === 200) {
            toastSuccess(`${response?.data?.message}`)
            return response.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error.response.data.message };
    }
}

export const deleteSubscriber= async (data) => {
    try {
        const response = await api.delete(`/delete-subscriber?${qs(data)}`);
        if (response?.status === 200) {
            toastSuccess(`${response?.data?.message}`)
            return response?.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error?.response?.data?.message };
    }
}

export const getAuditTrails = async (data) => {
    try {
        const response = await api.get(`/subscriber-audit?${qs(data)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}