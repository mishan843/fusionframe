import { qs, qsOne } from '../utils/utils';
import api from '../utils/api';

export const getUser = async (data) => {
    try {
        const response = await api.get(`/user/getalluser?${qs(data)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}   

export const getAllUser = async (data) => {
    try {
        const response = await api.get(`/user/getalluser`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}   

export const totalUser = async (data) => {
    try {
        const response = await api.get(`/user/getalluser`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

export const updateUser = async (data, dataset) => {
    try {
        const response = await api.put(`/user/update/${qsOne(data)}`, dataset);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}

export const deleteUser = async (params) => {
    try {
        const response = await api.delete(`/user/delete/${qsOne(params)}`);
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
}
