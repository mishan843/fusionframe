export const qs = (obj) => {
    return Object.keys(obj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&');
};


export const qsOne = (obj) => {
    return Object.keys(obj)
        .map(key => `${encodeURIComponent(obj[key])}`)
};