import api from "utils/api";
import { toastError, toastSuccess } from "utils/toast";
import { qs } from "utils/utils";

export const getInvoices = async (data) => {
    try {
        const response = await api.get(`/get-invoices?${qs(data)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

export const getInvoice = async () => {
    try {
        const response = await api.get(`/get-package`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

export const getInvoiceDetail = async (data) => {
    try {
        const response = await api.get(`/get-invoice?${qs(data)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

export const addInvoice = async (data) => {
    try {
        const response = await api.post(`/add-invoice`, data);
        if (response.status === 201) {
            toastSuccess(`${response?.data?.message}`)
            return response.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error.response.data.message };
    }
}

export const UpdateInvoice = async (data, params) => {
    try {
        const response = await api.put(`/update-invoice/${params}`, data);
        if (response.status === 200) {
            toastSuccess(`${response?.data?.message}`)
            return response.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error.response.data.message };
    }
}

export const deleteInvoice = async (data) => {
    try {
        const response = await api.delete(`/delete-invoice?${qs(data)}`);
        if (response?.status === 200) {
            toastSuccess(`${response?.data?.message}`)
            return response?.data;
        }
    } catch (error) {
        toastError(`${error.response.data.message}`)
        return { error: error?.response?.data?.message };
    }
}
