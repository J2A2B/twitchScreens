<template>
  <div class="container" v-bind:class="{ 'container-full': !showGames }">
    <div class="container__main-game">
        <div class="container__main-game__header left">
          <!-- <div class="container__main-game__header__game" @click="showGames=!showGames">
            <i class="fas fa-gamepad"></i>
            <span class="container__main-game__header__game__title">{{this.$store.state.gameSelected}}</span>
          </div> -->
          <globalSearch :isOpen="true"></globalSearch>
        </div>
        <div class="container__main-game__cont-right">
          <div class="container__main-game__cont-right__header right">
            <menuTop></menuTop>
          </div>
          <h1 class="container__main-game__cont-right__title">
            <router-link :to="{name: 'home'}">
              Twitch Screens
            </router-link>
          </h1>
        </div>
        <div class="container__main-game__cont-right__controls" v-if="this.$store.state.streamListPlaying.length > 0">
          <div @click="muteAllStream" class="container__main-game__cont-right__controls__button">
            <i class="fas fa-volume-up sound" v-if="!this.$store.state.allStreamAreMuted"></i>
            <i class="fas fa-volume-off" v-if="this.$store.state.allStreamAreMuted"></i>
          </div>
          <div @click="pauseAllStream" class="container__main-game__cont-right__controls__button">
            <i class="fas fa-play" v-if="this.$store.state.allStreamArePaused"></i>
            <i class="fas fa-pause" v-if="!this.$store.state.allStreamArePaused"></i>
          </div>
          <div @click="removeAllStream" class="container__main-game__cont-right__controls__button">
            <i class="far fa-times-circle"></i>
          </div>
        </div>

    </div>
    <streamList :showGames="showGames" :list="streamList"></streamList>
    <ul class="container__ul" :class="{ 'container-full__ul-open': !showGames }">
      <li class="container__ul__li" v-for="element in this.$store.state.streamListPlaying" :class="{ 'hideitmotherfucker': element === 'undefined' }">
        <stream :videoName="element"></stream>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios';
import menuTop from './menuTop.vue';
import streamList from './streamList.vue';
import stream from './stream.vue';
import globalSearch from './global-search.vue';

import { mapState, mapActions } from 'vuex';
import store from '../store/store';
import * as type from '../store/mutationTypes/types';

export default {
  name: 'game',
  data () {
    return {
      gameName: this.$route.params.name,
      showGames: true,
      streamList: [],
      videoSelected:[],
      err:''
    }
  },

  computed: {
    searchGame: function(){
      if(!this.games){
        return;
      }
      const games = this.games;

      const self=this;
      return games.filter((str) => {
        return str.game.name.toLowerCase().indexOf(self.search.toLowerCase())>=0;
      });
    },
    // setSelectedGame() {
    //   return console.log(this.$route.params.name)
    //   this.$store.commit('SET_GAME', this.$route.params.name)
    // }
  },

  created(){
  //   this.$store.dispatch(
  //     {type: 'handleNewGameSelected',
  //     game: 'Fortnites'}
  //   )
  //
  // },
  console.log(this.$route.params.name)
  this.handleNewGameSelected({game: this.$route.params.name})
  // this.handleNewGameSelected({game: })
},
  // created () {
  //   // this.getGame();
  //   if (this.$store.state.gameSelected.length < 1) {
  //     // this.getGame()
  //     // console.log(this.$route.params.name)
  //     this.handleNewGameSelected(this.$route.params.name)
  //     // this.('SET_GAME', this.$route.params.name)
  //     // this.getStreams()
  //   }
  // },
  methods: {
    onClickStream (value) {
      if (Array.isArray(value)) {
        this.videoSelected = value;
      }else {
        this.err = value;
      }
    },
    muteAllStream () {
      this.$store.commit('SET_STREAM_MUTED')
    },
    pauseAllStream () {
      this.$store.commit('SET_STREAM_PAUSED')
    },
    removeAllStream () {
      this.$store.commit('SET_STREAM_REMOVE')
    },
    ...mapActions({
      getGame: 'getGame',
      getStreams: 'getStreams',
      handleNewGameSelected: 'handleNewGameSelected'
    })
    // setSelectedGame() {
    //   return console.log($route.params.name)
    //   this.$store.commit('SET_GAME', $route.params.name)
    // }
    // setSelectedGame (value) {
    //     this.$store.commit('GET_GAMES', value)
    // },
    // ...mapActions({
    //   gameSelected: 'gameSelected'
    // })
  },

  components: {
    menuTop,
    streamList,
    stream,
    globalSearch
  }
}
</script>

<style scoped lang="scss">

.hideitmotherfucker{
  display: none;
}
.container{
  display: flex;

  width: 100%;
  &__main-game{
    display: flex;
    // justify-content: space-around;
    align-items: center;
    border: 1px solid #5E19FF;
    position: relative;
    border-radius: 2px;
    color: #222222;
    position: fixed;
    width: 100%;
    background: white;
    z-index: 999;
    box-shadow: 0 2px 25px rgba(0,0,0,.3);
    right: 0px;
    height: 65px;
      &__header{
        display: flex;
        align-items: center;
        i{
          margin-right: 5px;
          color: #5E19FF;
        }
        &__game{
          cursor: pointer;
          box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
          padding: 10px;
          border-radius: 3px;
          display: flex;
          justify-content: center;
          align-items: center;
          &__title{
            font-weight: bold;
            text-align: center;
            white-space: nowrap;
            user-select: none;
          }
        }
        &__game:hover{
          background-color: #4b367c;
        }
        &__game:hover i{
          color: white;
        }
        &__game:hover span{
          color: white;
        }
      }
      &__cont-right{
        width: 80%;
        &__controls{
          display: flex;
          justify-content: center;
          align-items: center;
          border-left: 1px solid #5E19FF;
          margin-left: 40px;
          height: 100%;
          // padding-left: 40px;
          // padding-right: 40px;
          // width: 150px;
          &__button:nth-child(2){
            border: 1px solid #5E19FF;
          }
          &__button{
            height: 100%;
            width: 65px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            cursor: pointer;
            .sound{
              animation: moveSound 1s linear infinite;
            }
            i{
              width: 30px;
            }
          }
          &__button:hover i{
            color: #5E19FF
          }
        }
        &__title{
          position: absolute;
          left: 50%;
          // margin-left: -100px;
          top: 50%;
          top: 50%;
          transform: translateY(-100%);
          color: #4b367c;
          a{
            text-decoration: none;
          }
          a:hover{
            color: #AF91FF;
            cursor: pointer;
          }
        }
      }
      .left {
        left: 0;
        border-radius: 2px;
        padding-left: 15px;
        padding-right: 15px;
        height: 100%;
        min-width: 260px;
        border: 1px solid #5E19FF;
        display: flex;
        justify-content: center;
      }
      .right{
        margin-left: 40px;
        // position: absolute;
        right: 0;
        justify-content: flex-end;
      }
  }
  &__ul{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin: 0px;
    padding: 0px;
    margin-top: 60px;
    width: calc(100% - 300px);
    // position: fixed;
    margin-left: 290px;
    &__li{
      width: 50%;
    }
  }
}
.container-full{
  position: relative;
  left: -300px;
  width: calc(100% + 300px);
  ul{
    width: 100%;
  }
}

@keyframes moveSound {
  0% {
        transform: scale(1.05);
  }
  100% {
        transform: scale(0.9);
  }
}
</style>
