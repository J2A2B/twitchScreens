<template>
  <div class="container" v-bind:class="{ 'container-full': !showGames }">
    <div class="container__main-game">
        <div class="container__main-game__header left">
          <div class="container__main-game__header__main-search__cont-search">
            <label class="container__main-game__header__main-search__cont-search__label" :data-state="state" for="search">
              <input class="inputText"
              @blur="unFocus()"
              name="searchGame"
              v-model="search"
              required >
              <span class="floating-label" required>
                {{this.$store.state.gameSelected}}
              </span>
              <i class="fa fa-search"
              aria-hidden="true"
              @click="search=''" >
              </i>
            </label>
            <ul class="container__main-game__header__main-search__cont-search__ul">
              <li class="container__main-game__header__main-search__cont-search__ul__li first"
                v-if="search.length > 0 && this.$store.state.gameSelected.length > 0">
                <span>{{this.$store.state.gameSelected}}</span>
                <i class="fas fa-check"></i>
              </li>
              <li class="container__main-game__header__main-search__cont-search__ul__li"
              v-for="item in results" >
                <router-link
                :to="{ name: 'game', params: { name: item.game.name }}" @mousedown.native="setSelectedGame(item.game.name), state='open'"
                >
                  <img v-bind:src="item.game.box.small" alt=""/>
                  <span>{{item.game.name}}</span>
                </router-link>
              </li>
            </ul>
          </div>
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
        <div class="container__main-game__cont-right__controls"
          v-if="this.$store.state.streamListPlaying.length > 0">
          <div @click="muteAllStream" class="container__main-game__cont-right__controls__button">
            <i class="fas fa-volume-up sound"
              v-if="!this.$store.state.allStreamAreMuted">
            </i>
            <i class="fas fa-volume-off" v-if="this.$store.state.allStreamAreMuted">
            </i>
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
    <ul class="container__ul"
      :class="{ 'container-full__ul-open': !this.$store.state.showStreamList }">
      <li class="container__ul__li" v-for="element in this.$store.state.streamListPlaying"
        :class="{ 'hideitmotherfucker': element === 'undefined' }">
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
      showGames: true,
      streamList: [],
      err:'',
      search:'',
      searchedGames: [],
      state: 'open',
      isShowList: true,
      noResult: false
    }
  },
  created(){
    this.handleNewGameSelected({game: this.$route.params.name})
    this.getGames()
    if (this.isOpen) {
      this.state = 'open'
    }
  },
  methods: {
    muteAllStream () {
      this.$store.commit('SET_STREAM_MUTED')
    },
    pauseAllStream () {
      this.$store.commit('SET_STREAM_PAUSED')
    },
    removeAllStream () {
      this.$store.commit('SET_STREAM_REMOVE')
      this.$store.commit('ALWAYS_OPEN_LIST_STREAM')
    },
    setSelectedGame(game) {
      this.$router.push('/game/'+ game);
      this.handleNewGameSelected({game: game})
    },
    unFocus(){
      this.search = '';
    },
    ...mapActions({
      getGames: 'getGames',
      handleNewGameSelected: 'handleNewGameSelected'
    })
  },
  computed: {
    results: function () {
      let search = this.search;
      if (search.length > 0 && this.state === 'open') {
          const games = this.$store.state.gameList
          const self = this
          return games.filter((str) => {
            return str.game.name.toLowerCase().indexOf(
              self.search.toLowerCase()
              ) >= 0
          })
      }
    }
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
        &__main-search{
          &__cont-search{
            position: relative;
            display: flex;
            justify-content: center;

            &__label{
              position: relative;
              display: inline-block;
              background-color: #fff;
              padding: 5px 12px;
              transition: all 0.2s ease;
              border-radius: 0;
              box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
              &::after{
                content: '';
                display: block;
                height: 2px;
                width: 90%;
                background-color: #5E19FF;
                transition: all 0.5s ease 0.5s;
              }
              input{
                transition: width 0.5s ease, opacity 0.5s ease 0.5s;
                opacity: 1;
                width: 235px;
                height: 25px;
                border: 0;
                outline: none;
                color: darken(#5E19FF, 25)
              }
              i{
                position: absolute;
                top: 19px;
                right: 11px;
                color: #333;
                cursor: pointer;
              }
              &[data-state="close"]{
                border-radius: 30px;
                transition: all 0.5s ease;
                &::after{
                  width: 0%;
                  transition: all 0.1s ease;
                }
                i{
                  pointer-events: none;
                }
                input{
                  height: 25px;
                  width: 28px;
                  opacity:0;
                  cursor: pointer;
                  transition: opacity 0.5s ease, width 0.5s ease;
                  -webkit-appearance:none
                }
              }
              .floating-label {
                position: absolute;
                pointer-events: none;
                left: 20px;
                top: 18px;
                transition: 0.2s ease all;
              }
              input:focus ~ .floating-label,
              input:not(:focus):valid ~ .floating-label{
                top: 8px;
                bottom: 10px;
                left: 20px;
                font-size: 11px;
                opacity: 1;
              }
              span{
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                width: 200px;
              }
              .inputText {
                padding-top: 10px;
                font-size: 14px;
                height: 30px;
              }
            }
            i{
              margin-right: 5px;
              color: #5E19FF;
            }
            &__ul{
              margin-top: 53px;
              background-color: rgba(250, 250, 250, 0.95);
              color: #222222;
              position: absolute;
              list-style: none;
              padding: 0;
              max-height:400px;
              overflow-y: scroll;
              border-radius: 2px;
              text-decoration: none;
              .first{
                position: fixed;
                border: 1px solid #00C29A;
                font-weight: bold;
                display: flex;
                justify-content: space-around;
                align-items: center;
                cursor: default;
                width: 245px;
                cursor: pointer;
                padding: 5px;
                padding-left: 10px;
                left: 15px;
                background-color: rgba(250, 250, 250, 0.95);
              }
              .fa-check{
                color: #00C29A;
              }
              &__li:nth-child(2){
                margin-top: 40px;
              }
              &__li{
                width: 245px;
                cursor: pointer;
                padding: 5px;
                padding-left: 10px;
                a{
                  display: flex;
                  align-items: center;
                  text-decoration: none;
                  color: #222222;
                }
                a:hover {
                  color: #4B397A;
                }
                img{
                  margin-right: 5px;
                  height: 40px;
                }
              }
              &__li:hover{
                list-style: none;
                background-color: rgba(250, 250, 250, 0.95);
              }
            }
            }
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
    margin-top: 67px;
    width: calc(100% - 300px);
    margin-left: 302px;
    transition: all 0.3s;
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
.container-full__ul-open{
  margin-left: 0px;
  transition: all 0.3s;
  width: 100%;
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
