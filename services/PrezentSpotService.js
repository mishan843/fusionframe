import { qs, qsOne } from '../utils/utils';
import api from '../utils/api';

export const getPrezentSpot = async (data) => {
    try {
        const response = await api.get(`/prezentspot/getallspot?${qs(data)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

export const getOnePrezentSpot = async (data) => {
    try {
        const response = await api.get(`/prezentspot/getspot/${qsOne(data)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

export const updatePrezentSpot= async (data,params) => {
    try {
        const response = await api.put(`/prezentspot/update/${qsOne(params)}`, data);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        return { error: error.response.data.message };
    }
}

export const deleteOnePrezentSpot = async (data) => {
    try {
        const response = await api.delete(`/prezentspot/delete/${qsOne(data)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

export const addPrezentSpot = async (data) => {
    try {
        const response = await api.post(`/prezentspot/create`, data);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        return { error: error.response.data.message };
    }
}

export const searchPrezentSpot = async (data) => {
    try {
        const response = await api.get(`/search-faq?${qs(data)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}