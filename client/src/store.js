import Vue from 'vue'
import Vuex from 'vuex'
import dialog from '@store/dialog';
import gameBoard from '@store/gameBoard';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dialog,
    gameBoard,
  },
  getters: {},
  actions: {},
  mutations: {},
})
