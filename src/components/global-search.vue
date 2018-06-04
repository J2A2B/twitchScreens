<template>
  <div class="main-search">
    <div class="main-search__cont-search">
      <label :data-state="state" for="search">
        <input
        class="main-menu__search__input"
        name="searchGame"
        placeholder="Search a game"
        v-model="search"
        @click="state = 'open'"
        >
        <i
        class="fa fa-search"
        aria-hidden="true"
        @click="state='close', search=''"
        >
      </i>
    </label>
    <ul
      class="main-search__cont-search__ul">
    <li class="main-search__cont-search__ul__li"
      v-for="item in results"
    >
    <router-link
    @click.native="setSelectedGame(item.game.name), state='open'"
    :to="{ name: 'game', params: { name: item.game.name }}"
    >
    <img v-bind:src="item.game.box.small" alt=""/>
    <span>{{item.game.name}}</span>
  </router-link>
</li>
</ul>
</div>
</div>
</template>
<script>
import axios from 'axios';
import { mapState, mapActions } from 'vuex';
import store from '../store/store';
import * as type from '../store/mutationTypes/types';

export default {
  name: 'global-search',
  props: {
    searchProps: String
  },
  data () {
    return {
      search:'',
      searchedGames: [],
      state: 'close',
      isShowList: true
    }
  },
  created() {
    this.getGames()
    // this.getStreams()
  },
  methods: {
    setSelectedGame(game) {
      console.log('game',game)
      // this.getGame()
      // this.getStreams()
      this.handleNewGameSelected({game: game})
    },
    ...mapActions({
      getGames: 'getGames',
      handleNewGameSelected: 'handleNewGameSelected',
      getStreams: 'getStreams'
    })
  },
  computed: {
    results: function () {
      var search = this.search;
      const headers = {
        Authorization: 'OAuth cfabdegwdoklmawdzdo98xt2fo512y',
        "Client-ID": '4vanrv34kq4ot0f3qh84ng3qz2m9o7'
      }
      if (search.length > 0 && this.state === 'open') {
        const games = this.$store.state.gameList
        const self=this
        return games.filter((str) => {
          return str.game.name.toLowerCase().indexOf(
            self.search.toLowerCase()
          )>=0;
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.main-search{
  margin-right: 40px;
  &__cont-search{
    position: relative;
    display: flex;
    justify-content: center;

    label{
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
        width: 252px;
        height: 25px;
        border: 0;
        outline: none;
        color: darken(#5E19FF, 25)
      }
      i{
        position: absolute;
        top: 11px;
        right: 11px;
        color: #333;
        cursor: pointer;
      }
      &[data-state="close"]{
        border-radius: 30px;
        padding: 5px 5px;
        transition: all 0.5s ease;
        &::after{
          width: 0%;
          transition: all 0.1s ease;
        }
        i{
          pointer-events: none;
        }
        input{
          width: 28px;
          height: 25px;
          opacity:0;
          cursor: pointer;
          transition: opacity 0.5s ease, width 0.5s ease;
          -webkit-appearance:none
        }
      }
    }
    &__ul{
      margin-top: 42px;
      background-color: rgba(250, 250, 250, 0.8);
      color: #222222;
      position: absolute;
      list-style: none;
      padding: 0;
      max-height:400px;
      overflow-y: scroll;
      border-radius: 2px;
      text-decoration: none;
      &__li{
        width: 264px;
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
        background-color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
</style>
