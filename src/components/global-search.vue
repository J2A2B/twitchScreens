<template>
  <div class="main-search">
    <div class="main-search__cont-search">
      <label :data-state="state" for="search">
        <input class="inputText"
        name="searchGame"
        v-model="search"
        @click="state = 'open'"
        required >
        <span class="floating-label" required>{{this.$store.state.gameSelected}}</span>
        <i class="fa fa-search"
        aria-hidden="true"
        @click="state='close', search=''" >
        </i>
      </label>
      <ul class="main-search__cont-search__ul">
        <li class="main-search__cont-search__ul__li first"
          v-if="search.length > 0 && this.$store.state.gameSelected.length > 0">
          <span>{{this.$store.state.gameSelected}}</span>
          <i class="fas fa-check"></i>
        </li>
        <li class="main-search__cont-search__ul__li"
        v-for="item in results" >
          <router-link
          @click.native="setSelectedGame(item.game.name), state='open'"
          :to="{ name: 'game', params: { name: item.game.name }}">
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
    isOpen: Boolean
  },
  data () {
    return {
      search:'',
      searchedGames: [],
      state: 'close',
      isShowList: true,
      noResult: false
    }
  },
  created() {
    this.getGames()
    if (this.isOpen) {
      this.state = 'open'
    }
  },
  methods: {
    setSelectedGame(game) {
      this.handleNewGameSelected({game: game})
    },
    ...mapActions({
      getGames: 'getGames',
      handleNewGameSelected: 'handleNewGameSelected'
    })
  },
  computed: {
    results: function () {
      var search = this.search;
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
  }
}
</script>

<style scoped lang="scss">

.main-search{
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

  .floating-label {
    position: absolute;
    pointer-events: none;
    left: 20px;
    top: 18px;
    transition: 0.2s ease all;
  }
}

</style>
