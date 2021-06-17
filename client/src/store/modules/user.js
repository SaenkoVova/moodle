import http from "../../util/http";

const userEndpoints = {
    LOGIN: '/auth/signin',
    GET_PERSONAL_INFO: '/user/load_personal_info'
}

export default {
    namespaced: true,
    state: {
        user: null,
        token: localStorage.getItem('token') || null,
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setToken(state, payload) {
            state.token = payload;
            localStorage.setItem('token', payload);
        },
        unsetUser(state) {
            state.user = null;
        },
        unsetToken(state) {
            state.token = null
            localStorage.removeItem('token');
        }
    },
    actions: {
        logIn({commit}, payload) {
            return new Promise((resolve, reject) => {
                console.log(userEndpoints.LOGIN)
                http.post(userEndpoints.LOGIN, payload)
                    .then(res => {
                        commit('setToken', res.data.token);
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        },
        loadPersonalInfo({commit}) {
            return new Promise((resolve, reject) => {
                http.get(userEndpoints.GET_PERSONAL_INFO)
                    .then(res => {
                        commit('setUser', res.data)
                        resolve()
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
    },
    getters: {
        isAuthorized: state => state.token,
        getUserRole: state => state.user?.role,
        getUser: state => state.user
    }
}
