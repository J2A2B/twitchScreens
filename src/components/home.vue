<template>
  <div class="main-cont-games">
    <ul>
      <li v-for="element in this.$store.state.gameList">
        <router-link :to="{ name: 'game', params: { name: element.game.name }}"
          v-on:click="setSelectedGame(element.game.name)"
        >
          <img :src=element.game.box.large>
          <div class="cont-infos-game">
            <h2>{{element.game.name}}</h2>
            <p>{{element.viewers}} viewers</p>
            <p>{{element.channels}} channels</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios';
import { mapState, mapActions } from 'vuex';
import store from '../store/store';
import * as type from '../store/mutationTypes/types';

export default {
  name: 'menu',
  data: () => ({
    state: 'close',
    games: [],
    errors: []
  }),
  created() {
    this.getGames()
  },
  methods: {
    setSelectedGame (value) {
        this.$store.commit('GET_GAMES', value)
      },
    ...mapActions({
     getGames: 'getGames'}),
  },
  computed: {
    searchGame: function(){
      if(!this.games){
        return;
      }
      const games = this.games;
      const self=this;

      return games.filter((str) => {
        return str.game.name.toLowerCase().indexOf(
          self.search.toLowerCase()
        )>=0;
      });
    }
  },
}
</script>

<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
  margin:0;
}
p{
  margin: 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
button {
  border: none;
  color: white;
  text-align: center;
}

.main-cont-games{
  display: flex;
  flex-direction: column;
  .cont-search{
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4B397A;
    position: fixed;
    z-index: 999;
    label{
      position: relative;
      display: inline-block;
      background-color: #fff;
      padding: 5px 12px;
      transition: all 0.5s ease;
      border-radius: 0;
      box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
      &::after{
        content: '';
        display: block;
        height: 2px;
        width: 80%;
        background-color: #5E19FF;
        transition: all 0.5s ease 0.5s;
      }
      input{
        transition: width 1s ease, opacity 0.5s ease 0.5s;
        opacity: 1;
        width: 180px;
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
        transition: all 1s ease;
        &::after{
          width: 0%;
          transition: all 0.3s ease;
        }
        i{
          pointer-events: none;
        }
        input{
          width: 28px;
          height: 25px;
          opacity:0;
          cursor: pointer;
          transition: opacity 0.5s ease, width 1s ease;
          -webkit-appearance:none
        }
      }
    }
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-top: 80px;
    cursor: pointer;
    min-height: calc(100vh - 50px);
    background: #222222;
    .li-none{
      display: none;
    }
    li{
      overflow: hidden;
      width: 20%;
      margin: 10px;
      display: flex;
      flex-direction:column;
      position: relative;
      display: block;
      img{
        width: 100%;
      }
      .cont-infos-game{
        z-index: 300;
        height: 80px;
        background-color: #1C232A;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        bottom: -80px;
        left: 0;
        right: 0;
        background: rgba(28,35,42, 0.80);
        color: #fff;

        transition: bottom 0.7s;
        button{
          background-color: transparent;
          font-size: 16px;
          font-weight: bold;
          color: white;
        }
        p{
          text-align: center;
          margin-top: 5px;
          font-size:12px;
          color: #f6f6f6;
        }
        h2{
          font-size: 20px;
          text-align: center;
          color: #f6f6f6;
          text-transform: lowercase;
        }
        h2::first-letter {
          text-transform: uppercase;
        }
      }
    }
    li:hover .cont-infos-game{
      bottom: 0;
    }
  }
}
</style>
