<template>
  <div class="main-stream"
    v-bind:class="{ 'main-stream-show': !this.$store.state.showStreamList }">
    <ul class="main-stream__ul">
      <div class="main-stream__ul__select">
        <div class="main-stream__ul__select__viewers"
          @click="selectSort('Viewers')"
          v-bind:class="{ 'sort': sortStream === false }">
          <i class="fas fa-eye"></i>
          <span>Viewers</span>
        </div>
        <div class="main-stream__ul__select__alpha"
          @click="selectSort('Alphabetical')"
          v-bind:class="{ 'sort': sortStream === true }">
          <i class="fas fa-sort-alpha-down"></i>
          <span>Alpha</span>
        </div>
        <div class="main-stream__ul__select__cont-cross"
          @click="showList()"
          v-bind:class="{ 'openList': !this.$store.state.showStreamList }">
          <i class="fas fa-chevron-left main-stream__cont-cross__cross"></i>
        </div>
      </div>
      <li class="main-stream__ul__li"
        v-for="element in this.$store.state.streamList"
        @click="selectStream(element)">
        <img class="main-stream__ul__li__img" :src="element.channel.logo" >
        <div class="main-stream__ul__li__infos">
          <span class="main-stream__ul__li__infos__name">{{element.channel.display_name}}</span>
          <div class="main-stream__ul__li__infos__views">
            <div class="main-stream__ul__li__infos__views__online"></div>
            <span class="main-stream__ul__li__infos__views__viewers">{{element.viewers}}</span>
          </div>
        </div>
        <div class="main-stream__ul__li__cont-play" v-if="allStreamNamePlaying.includes(element.channel.name)
          && $store.state.streamListPlaying.length > 0">
          <i class="fas fa-play"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import stream from './stream.vue';

import axios from 'axios';
import { mapState, mapActions } from 'vuex';
import store from '../store/store';
import * as type from '../store/mutationTypes/types';
import globalSearch from './global-search.vue';

export default {
  props: {
    list: Array,
    showGames: Boolean
  },
  data: () => ({
    sortStream: false,
    showListStreams: true,
    streamIsPlaying : false,
    allStreamNamePlaying : []
  }),

  methods: {
    selectStream (element, event) {
      const streamChannel = element.channel.name;
      const streamListPlaying = this.$store.state.streamListPlaying
      if (!streamListPlaying.includes(streamChannel)) {
        streamListPlaying.push(streamChannel);
        this.allStreamNamePlaying = streamListPlaying
        this.$store.commit('SET_STREAM_PLAYING', streamListPlaying)
      } else {
        this.$emit('clicked', this.err)
      }
    },
    showList () {
     this.$store.commit('SHOW_LIST_STREAM')
    },
    selectSort (sortEl){
      this.sortElement = sortEl
      if (sortEl === 'Alphabetical') {
        this.sortStream = true
        function compare(a, b) {
          if (a.channel.name < b.channel.name)
          return -1;
          if (a.channel.name > b.channel.name)
          return 1;
          return 0;
        }
        return this.$store.state.streamList.sort(compare);
      } else if (sortEl === 'Viewers') {
        this.sortStream = false
        function compare(x, y) {
          return y.viewers - x.viewers;
        }
        return this.$store.state.streamList.sort(compare);
      }
    }
  },
  components: {
    stream,
    globalSearch
  }

}
</script>

<style scoped lang="scss">
::-webkit-scrollbar {
    width: 10px;
}
::-webkit-scrollbar-track {
    background: #f1f3f1;
    margin-top: 40px;
}
::-webkit-scrollbar-thumb {
    background: #4B397A;
}
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
.main-stream{
  display: flex;
  margin-top: 67px;
  position: relative;
  left: 0px;
  transition: left 0.5s;
  &__ul{
    transition: transform 0.5s;
    display: flex;
    flex-direction: column;
    margin: 0px;
    padding: 0px;
    background-color: #1c232a;
    color: white;
    list-style: none;
    width: 301px;
    min-height: calc(100vh - 44px);
    max-height: calc(100vh - 60px);
    position: fixed;
    overflow: scroll;
    padding-top: 40px;
    &__select{
      z-index: 9;
      position: fixed;
      display: flex;
      top: 67px;
      width: 301px;
      &__viewers, &__alpha {
        height: 40px;
        width: 124px;
        background: white;
        display: flex;
        justify-content: center;
        color: black;
        align-items: center;
        border-bottom: 1px solid #5E19FF;
        border-right: 1px solid #5E19FF;
        cursor: pointer;
        i{
          margin-right: 10px;
        }
      }
      &__viewers:hover, &__alpha:hover{
        background-color: #5E19FF;
        color: white;
        border: 1px, solid, transparent;
        i{
          color: white;
        }
      }
      &__viewers{
        border-left: 1px solid #5E19FF;
      }
      &__alpha{
        // border-right: none;
      }
        i{
          transition: all 0.3s ease;
          color: #5E19FF;
        }
      .sort{
        background-color: #5E19FF;
        color: white;
        i{
          color: white;
        }
      }
      &__cont-cross{
        z-index: 9;
        cursor: pointer;
        position: absolute;
        left: 251px;
        height: 32px;
        width: 19px;
        border-top: none;
        padding-bottom: 2px;
        padding-top: 6px;
        padding-left: 15px;
        background: white;
        padding-right: 15px;
        border: 1px solid #5E19FF;
        border-left: none;
        border-top: none;
        display: flex;
        justify-content: center;
        align-items: center;
        &__cross{
          color: #4b367c;
          font-size: 30px;
          transition: transform 0.3s;
          transform: rotate(0deg);
        }
      }
      &__cont-cross:hover{
        background: #5E19FF;
        i{
          color: white;
        }
      }
    }
    &__li{
      cursor: pointer;
      height: 50px;
      margin-top: 10px;
      border-bottom: 1px solid #545454;
      list-style: none;
      padding: 25px;
      padding-left: 10px;
      display: flex;
      align-items: center;
      &__img{
        height: 35px;
        margin-right: 10px;
        display: inline-block;
      }
      &__infos{
        display: inline-block;
        &__views{
          display: flex;
          align-items: center;
          &__online{
            height: 10px;
            width: 10px;
            border-radius: 10px;
            background-color: red;
            margin-right: 5px;
          }
        }
        &__name{
          word-break: break-all;
        }
      }
      &__cont-play{
        position: absolute;
        right: 15px;
        color: #00C29A;
        i{
          font-size: 12px;
        }
        i{
          animation: movePlay 1s linear 3;
        }
      }
    }
    &__li:hover{
      background-color: lighten(#1c232a, 8%);
    }
  }

}
.main-stream-hide{
  transition: all 0.3s;
  width: 0;
}
.main-stream-show{
  position: relative;
  left: -302px;
  transition: left 0.3s;
}
.openList{
  position: fixed;
  left: 0;
  transition: left 0.3s;
  i{
    transform: rotate(180deg);
  }
}
@keyframes movePlay {
  0% {
        transform: scale(1.05);
  }
  100% {
        transform: scale(0.9);
  }
}
</style>
