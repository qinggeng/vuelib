import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    modalManager: {},
  },
  mutations: {
    set_modal_manager (state, payload) {
      state.modalManager = payload;
    },
    show_modal (state, payload) {
      state.modalManager.show_modal(payload);
    }
  },
  /* actions: { */
    /* show_modal ({commit}) { */
      /* commit('show_modal'); */
    /* } */
  /* }, */
});

export default {...store}
