import Vue from "vue"

export const namespaced = true

export const state = {
    orders: []
}

export const mutations = {
    SET_ORDERS(state, orders) {
        state.orders = orders
    },
    SET_SETTLED(state, orderID) {
        const index = state.orders.findIndex(order => order.id === orderID)
        if (index >= 0)
            state.orders[index].status = "settled"
    },
    UPDATE_ARTICLE_QUANTITY(state, { orderID, articleID, cartQuantity }) {
        const orderIndex = state.orders.findIndex(order => order.id === orderID)
        if (orderIndex < 0)
            return

        const articleIndex = state.orders[orderIndex].articles.findIndex(article => article.id === articleID)
        if (articleIndex >= 0)
            state.orders[orderIndex].articles[articleIndex].cartQuantity = cartQuantity
    },
    REMOVE_ARTICLE(state, { orderID, articleID }) {
        const index = state.orders.findIndex(order => order.id === orderID)
        if (index >= 0)
            state.orders[index].articles = state.orders[index].articles.filter(article => article.id !== articleID)
    },
    REMOVE_ORDER(state, orderID) {
        state.orders = state.orders.filter(order => order.id !== orderID)
    }
}

export const actions = {
    setOrders({ commit }) {
        Vue.prototype.$axios("/orders/")
            .then(({ data }) => commit("SET_ORDERS", data))
            .catch(error => console.log(error.response))
    },
    setSettled({ commit }, orderID) {
        commit("SET_SETTLED", orderID)
    },
    updateArticleQuantity({ commit }, { orderID, articleID, cartQuantity }) {
        commit("UPDATE_ARTICLE_QUANTITY", { orderID, articleID, cartQuantity })
    },
    removeArticle({ commit }, { orderID, articleID }) {
        commit("REMOVE_ARTICLE", { orderID, articleID })
    },
    removeOrder({ commit }, orderID) {
        commit("REMOVE_ORDER", orderID)
    }
}

export const getters = {
    pending: state => state.orders.filter(order => order.status === "pending"),
    settled: state => state.orders.filter(order => order.status === "settled"),
    order: state => orderID => state.orders.find(order => order.id === orderID)
}