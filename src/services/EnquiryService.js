import api from "utils/api";
import { toastError, toastSuccess } from "utils/toast";
import { qs } from "utils/utils";

export const getEnquiry = async (data) => {
    try {
        const response = await api.get(`/get-enquiries?${qs(data)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

export const addEnquiry = async (data) => {
    try {
        const response = await api.post(`/add-enquiry`, data);
        if (response.status === 201) {
            toastSuccess(`${response?.data?.message}`)
            return response.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
    return { error: error.response.data.message };
    }
}

export const UpdateEnquiry = async (data, userId) => {
    try {
        const response = await api.put(`/update-enquiry/${userId}`, data);
        if (response.status === 200) {
            toastSuccess(`${response?.data?.message}`)
            return response.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error.response.data.message };
    }
}

export const getEnquiryDetail = async (data) => {
    try {
        const response = await api.get(`/get-enquiry?${qs(data)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

export const deleteEnquiry= async (data) => {
    try {
        const response = await api.delete(`/delete-enquiry?${qs(data)}`);
        if (response?.status === 200) {
            toastSuccess(`${response?.data?.message}`)
            return response?.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error?.response?.data?.message };
    }
}