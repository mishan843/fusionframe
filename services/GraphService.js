import api from "../utils/api";

export const sessionStats = async () => {
    try {
        const response = await api.get('/session/sessions-graph-data');
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        return { error: error.response.data.message };
    }
}

export const newUserGraph = async (data) => {
    try {
        const response = await api.get(`/user/newuser-graph?range=${data}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        return { error: error.response.data.message };
    }
}

export const newUserGraphData = async (data) => {
    try {
        const response = await api.get(`/user/newuserdata-graph`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        return { error: error.response.data.message };
    }
}

export const userFriendsGraph = async (data) => {
    try {
        const response = await api.get(`/user/userfriends-graph`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        return { error: error.response.data.message };
    }
}