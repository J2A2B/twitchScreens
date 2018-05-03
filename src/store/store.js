import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    gameList: [],
    gameSelected: ''
  },
  mutations: {
    GET_GAMES (state, payload) {
      state.gameList = payload
    },
    SELECT_GAME (state, payload) {
      state.gameSelected = payload
    }
  },
  actions: {
    getGames ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/games')
        .then(response => {
          commit('GET_GAMES', response.data.top)
          resolve()
        })
        .catch(err => {
          console.log(err)
        })
      })
    },
    gameSelected ({ commit }, { game }) {
      return commit('SELECT_GAME', game)
    }
  }
})

export default store
