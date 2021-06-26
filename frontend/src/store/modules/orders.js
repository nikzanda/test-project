import Vue from "vue"

export const namespaced = true

export const state = {
    orders: []
}

export const mutations = {
    SET_ORDERS(state, orders) {
        state.orders = orders
    }
}

export const actions = {
    setOrders({ commit }) {
        Vue.prototype.$axios("/orders/")
            .then(({ data }) => commit("SET_ORDERS", data))
            .catch(error => console.log(error.response))
    }
}

export const getters = {
    pending: state => state.orders.filter(order => order.status === "pending"),
    settled: state => state.orders.filter(order => order.status === "settled"),
    order: state => orderID => state.orders.find(order => order.id === orderID)
}