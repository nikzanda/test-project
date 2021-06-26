import Vue from "vue"

export const namespaced = true

export const state = {
    orders: []
}

export const mutations = {
    SET_ORDERS(state, orders) {
        state.orders = orders
    },
    REMOVE_ARTICLE(state, { orderID, articleID }) {
        const index = state.orders.find(order => order.id === orderID)
        if (index >= 0)
            state.orders[index].articles = state.orders[index].articles.filter(article => article.id !== articleID)
    }
}

export const actions = {
    setOrders({ commit }) {
        Vue.prototype.$axios("/orders/")
            .then(({ data }) => commit("SET_ORDERS", data))
            .catch(error => console.log(error.response))
    },
    removeArticle({ commit }, orderID, articleID) {
        commit("REMOVE_ARTICLE", orderID, articleID)
    }
}

export const getters = {
    pending: state => state.orders.filter(order => order.status === "pending"),
    settled: state => state.orders.filter(order => order.status === "settled"),
    order: state => orderID => state.orders.find(order => order.id === orderID)
}