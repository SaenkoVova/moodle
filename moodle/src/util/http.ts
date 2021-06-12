import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import store from "@/store";
import router from "@/router";

import baseURL from "@/util/api";

const http = axios.create({
    baseURL: baseURL,
    timeout: 5000
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
http.axios = axios;

const PUBLIC_URLS = [
    'register/',
    'login/'
]

http.interceptors.request.use((config: AxiosRequestConfig) => {
    if(!PUBLIC_URLS.includes(<string>config.url)) {
        const token = localStorage.getItem('token')
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
    if(router.currentRoute.meta.requiresAuth) {
        router.push('/')
    }
});

http.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        if(error.message === 'USER_CANCEL') {
            store.commit('user/unsetUser');
            return Promise.reject()
        }
        if(error.response.data.status === 403) {
            store.commit('user/unsetUser');
            if(router.currentRoute.meta.requiredAuth) {
                router.push('/')
            }
            return Promise.reject(error);
        }
    }
);

export default http;
