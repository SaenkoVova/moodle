import axios from "axios";
import store from "@/store";
import router from "@/router";

import baseURL from "@/util/api";

const http = axios.create({
    baseURL: baseURL,
    timeout: 500000,
    contentType: "application/json"
});

http.axios = axios;

const PUBLIC_URLS = [
    '/auth/signin'
]

http.interceptors.request.use((config) => {
    if(!PUBLIC_URLS.includes(config.url)) {
        let token = localStorage.getItem('token')
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        else {
            throw new axios.Cancel('USER_CANCEL')
        }
    }
    return config;
}, () => {
    store.commit('user/unsetUser');
    store.commit('user/unsetToken');
    if(router.currentRoute.meta.requiresAuth) {
        router.push('/')
    }
});

http.interceptors.response.use(
    response => response,
    error => {
        if(error.message === 'USER_CANCEL') {
            store.commit('user/unsetUser');
            store.commit('user/unsetToken');
            return Promise.reject(error)
        }
        let status = error.response.status
        if(status === 401) {
            store.commit('user/unsetUser');
            store.commit('user/unsetToken');
            if(router.currentRoute.meta.requiredAuth) {
                router.push('/')
            }
            return Promise.reject(error);
        }
        return Promise.reject(error)
    }
);

export default http;
