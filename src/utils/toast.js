import { toast } from 'react-toastify';

const toastSuccess = (message) => {
    toast.success(message);
};

const toastError = (message) => {
    toast.error(message);
};

export { toastSuccess, toastError };