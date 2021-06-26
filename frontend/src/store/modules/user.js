import Vue from "vue"

export const namespaced = true

export const state = {
    user: null
}

export const mutations = {
    SET_USER_DATA(state, userData) {
        state.user = userData
        localStorage.setItem("user", JSON.stringify(userData))
        Vue.prototype.$axios.defaults.headers.common["Authorization"] = `Bearer ${userData.accessToken}`
    },
    CLEAR_USER_DATA() {
        localStorage.removeItem("user")
        location.reload()
    }
}

export const actions = {
    login({ commit, dispatch }, { email, password }) {
        return Vue.prototype.$axios.post("/login", {
            email: email,
            password: password
        }).then(({ data }) => {
            commit("SET_USER_DATA", data)
            dispatch('orders/setOrders', null, { root: true })
        })
    },
    logout({ commit }) {
        commit("CLEAR_USER_DATA")
    }
}

export const getters = {
    isLogged: (state) => !!state.user
}