import Vue from "vue";
import Vuex from "vuex";
import * as user from "@/store/modules/user.js"
import * as orders from "@/store/modules/orders.js"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user, orders
    }
});