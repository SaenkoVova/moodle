import http from "../../util/http";

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
            state.token = payload
        },
        unsetUser(state) {
            state.user = null;
        },
        unsetToken(state) {
            state.token = null
        }
    },
    actions: {
        logIn({commit}, payload) {
            return new Promise((resolve, reject) => {
                http.post('/signup', payload)
                    .then(res => {
                        commit('setToken', res.data.token);
                        commit('setUser', res.data.user);
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        }
    },
    getters: {
        isAuthorized: state => state.token
    }
}
