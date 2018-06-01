<template>
  <div class="main-stream" v-bind:class="{ 'main-stream-show': showGames }">
    <ul class="main-stream__ul">
      <div class="main-stream__ul__select" @click="showListSelect()">
        <div class="main-stream__ul__select__placeholder">
          <span>{{sortElement}}</span>
          <i class="fas fa-chevron-down" v-bind:class="{ 'chevronUp': showList }"></i>
        </div>
        <ul class="main-stream__ul__select__ul" v-bind:class="{ 'show-list': showList }">
          <li class="main-stream__ul__select__ul__li" @click="selectSort('Viewers')">
            <i class="fas fa-eye"></i>
            <span>Viewers number</span>
          </li>
          <li class="main-stream__ul__select__ul__li" @click="selectSort('Alphabetical')">
            <i class="fas fa-sort-alpha-down"></i>
            <span>Alphabetical</span>
          </li>
        </ul>
      </div>
      <!-- <input
      class="main-stream__ul__input"
      name="search"
      placeholder="Search a stream"
      v-model="search"
      > -->
      <li  class="main-stream__ul__li" v-for="element in this.$store.state.streamList" v-on:click="selectStream(element)">
        <img class="main-stream__ul__li__img" :src=element.channel.logo>
        <div class="main-stream__ul__li__infos">
          <span class="main-stream__ul__li__infos__name">{{element.channel.display_name}}</span>
          <div class="main-stream__ul__li__infos__views">
            <div class="main-stream__ul__li__infos__views__online"></div>
            <span class="main-stream__ul__li__infos__views__viewers">{{element.viewers}}</span>
          </div>
        </div>
      </li>
    </ul>
    <!-- {{data}} -->
    <!-- <div id="twitch-embed"></div> -->
  </div>
</template>

<script>
import stream from './stream.vue';

import axios from 'axios';
import { mapState, mapActions } from 'vuex';
import store from '../store/store';
import * as type from '../store/mutationTypes/types';
import globalSearch from './global-search.vue';
// import Vue from 'vue';
// import LoadScript from 'vue-plugin-load-script';

export default {
  props: {
    list: Array,
    showGames: Boolean
  },
  data: () => ({
    search:'',
    videoSelected: [],
    showList: false,
    sortElement: 'Sort stream',
    err:'',
    // player : 'new window.Twitch.Player("twitch-embed", options)'
  }),


  created(){

  },


  methods: {
    selectStream (element, event) {
      // console.log(this.$store.state.allStreamAreMuted)
      // const fullSrc = 'https://player.twitch.tv/?channel=' + element.channel.name + '&muted=' + this.$store.state.allStreamAreMuted;

      const streamChannel = element.channel.name;

      const streamListPlaying = this.$store.state.streamListPlaying
      // console.log(this.$store.state.streamListPlaying)
      if (!streamListPlaying.includes(streamChannel)) {
        streamListPlaying.push(streamChannel);
        this.$store.commit('SET_STREAM_PLAYING', streamListPlaying)
        this.err = '';
      } else {
        this.err = 'La vidéo est déjà lancée my friend :)';
        this.$emit('clicked', this.err)
      }
    },
    selectSort (sortEl){

      this.sortElement = sortEl
      if (sortEl === 'Alphabetical') {
        function compare(a, b) {
          if (a.channel.name < b.channel.name)
          return -1;
          if (a.channel.name > b.channel.name)
          return 1;
          return 0;
        }
        console.log(this.$store.state.streamList.sort(compare))
        return this.$store.state.streamList.sort(compare);
      } else if (sortEl === 'Viewers') {
        function compare(x, y) {
          return y.viewers - x.viewers;
        }

        return this.$store.state.streamList.sort(compare);
      }
    },
    showListSelect () {
      this.showList = !this.showList
    },
    triAlpha(a, b) {
      if (a < b) return -1;
      else if (a === b) return 0;
      else return 1;
    },
    ...mapActions({
      getStreams: 'getStreams'
    }),
  },
  computed: {
    // searchStream: function(){
    //   if(!this.list){
    //     return;
    //   }
    //   const streamList = this.$store.state.streamList;
    //   const self=this;
    //   return streamList.filter((str) => {
    //     return str.channel.name.toLowerCase().indexOf(
    //       self.search.toLowerCase()
    //     )>=0;
    //   });
    // }
    // selectSort: function() {
    //   function compare(a, b) {
    //     if (a.channel.name < b.channel.name)
    //     return -1;
    //     if (a.channel.name > b.channel.name)
    //     return 1;
    //     return 0;
    //   }
    //   return this.$store.state.streamList.sort(compare);
    // }
    // selectSort: function(){
    //   if (this.sortElement === 'viewer') {
    //
    //   } else {
    //     const streamList = this.$store.state.streamList.map( val => val.channel.name);
    //     console.log(streamList)
    //     streamList.sort(this.triAlpha);
    //     console.log(streamList.sort(this.triAlpha))
    //
    //     // triAlpha(a, b) {
    //     //   if (a < b) return -1;
    //     //   else if (a === b) return 0;
    //     //   else return 1;
    //     // }
    //   }
    // }
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
    width: 290px;
    min-height: calc(100vh - 44px);
    max-height: calc(100vh - 60px);
    position: fixed;
    overflow: scroll;
    // &__input{
    //   margin: 10px;
    //   margin-left: 0;
    //   padding: 10px;
    // }
    &__select{
      color: black;
      position: relative;
      padding: 10px;
      padding-bottom: 2px;
      cursor: pointer;
      &__placeholder{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #5E19FF;
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 3px;
        background: #f1f1f1;

        i{
          transition: all 0.3s ease;
          color: #5E19FF;
        }
      }
      &__ul{
        height: 0px;
        overflow: hidden;
        padding-left: 10px;
        padding-left: 0px;
        width: 260px;
        &__li{
          padding: 10px;
          padding-top: 5px;
          padding-bottom: 5px;
          list-style: none;
          height: 30px;
          display: flex;
          align-items: center;
          i{
            margin-right: 10px;
            color: #5E19FF;
          }
        }
        &__li:hover{
          background-color: #5E19FF;
          color: white;
        }
        &__li:hover i{
          color: white;
        }
      }
      .show-list{
        position: absolute;
        height: 80px;
        border: 1px solid #5E19FF;
        border-top: none;
        background: #f1f1f1;;
        width:259px;
      }
      .chevronUp{
        transform: rotate(180deg);
        transition: all 0.3s ease;
      }

    }
    &__li{
      cursor: pointer;
      height: 50px;
      margin-top: 10px;
      border-bottom: 1px solid #545454;
      list-style: none;
      padding: 5px;
      padding-left: 10px;
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
    }
    &__li:hover{
      background-color: lighten(#1c232a, 8%);
    }
  }
}
// .main-stream-show{
//   position: relative;
//   left: -300px;
//   transition: left 0.5s;
// }
</style>
