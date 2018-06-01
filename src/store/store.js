import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    gameList: [],
    streamList: [],
    gameSelected: '',
    streamListPlaying: [],
    allStreamAreMuted: false,
    allStreamArePaused: false
  },
  mutations: {
    GET_GAMES (state, payload) {
      state.gameList = payload
    },
    GET_STREAMS (state, payload) {
      state.streamList = payload
    },
    SET_GAMES (state, payload) {
      state.gameList = payload
    },
    SET_GAME (state, payload) {
      state.gameSelected = payload
    },
    SET_STREAM_PLAYING (state, payload) {
      state.streamListPlaying = payload
    },
    SET_STREAM_MUTED (state) {
      state.allStreamAreMuted = !state.allStreamAreMuted
    },
    SET_STREAM_REMOVE (state) {
      state.streamListPlaying = []
    },
    SET_STREAM_REMOVE_ONE (state, payload) {
      const index = state.streamListPlaying.indexOf(payload)
      if (index !== -1) {
        state.streamListPlaying.splice(index, 1)
      }
    },
    SET_STREAM_PAUSED (state) {
      state.allStreamArePaused = !state.allStreamArePaused
    }
  },
  actions: {
    getGames ({ commit }) {
      return axios.get('/games')
        .then(response => {
          commit('GET_GAMES', response.data.top)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getStreams ({ commit, state }, game) {
      return axios.get('/streams/' + game)
      .then(response => {
        commit('GET_STREAMS', response.data.streams)
      })
      .catch(err => {
        console.log(err)
      })
    },
    handleNewGameSelected ({ commit, dispatch }, { game }) {
      commit('SET_GAME', game)
      dispatch('getStreams', game)
    },
    removeOneStreamSelected ({ commit, dispatch }, { stream }) {
      commit('SET_STREAM_REMOVE_ONE', stream)
    }
    // muteAllStream ({ commit, state }) {
    //
    // }
  }
})

export default store
