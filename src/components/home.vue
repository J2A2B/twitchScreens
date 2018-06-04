<template>
  <div class="main-cont-games">
    <div class="main-cont-games__search">
      <div class="main-cont-games__search__title" @mouseover="show=true" @mouseleave="show=false">
        <div>
          <span class="twitch">T</span>
          <span class="hide" v-bind:class="{ w: show }">w</span>
          <span class="hide" v-bind:class="{ i: show }">i</span>
          <span class="hide" v-bind:class="{ t: show }">t</span>
          <span class="hide" v-bind:class="{ c: show }">c</span>
          <span class="hide" v-bind:class="{ h: show }">h</span>
        </div>
        <div v-bind:class="{ letters: show }" >
          <span class="screens" v-bind:class="{ sMove: show }">S</span>
          <span class="hide" v-bind:class="{ w: show }">c</span>
          <span class="hide" v-bind:class="{ i: show }">r</span>
          <span class="hide" v-bind:class="{ t: show }">e</span>
          <span class="hide" v-bind:class="{ c: show }">e</span>
          <span class="hide" v-bind:class="{ h: show }">n</span>
          <span class="hide" v-bind:class="{ s: show }">s</span>
        </div>
        <span class="line"></span>
      </div>
      <globalSearch :searchProps="searchProps"></globalSearch>
    </div>
    <ul>
      <li v-for="element in this.$store.state.gameList">
        <router-link @click.native="setSelectedGame(element.game.name)"
        :to="{ name: 'game', params: { name: element.game.name }}"
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
import globalSearch from './global-search.vue';

export default {
  name: 'menu',
  data () {
    return {
      state: 'close',
      searchProps: 'game',
      games: [],
      errors: [],
      search:'',
      show: false
    }
  },
  created() {
    this.getGames()
  },
  methods: {
    setSelectedGame (game) {
      console.log(game)
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
      var monresultatapi = 'call api ici avec search en param ('+ search +')';
      return monresultatapi;
    }
    // searchGame: function(){
    //   if(!this.games){
    //     return;
    //   }
    //   const games = this.games;
    //   const self=this;
    //
    //   return games.filter((str) => {
    //     return str.game.name.toLowerCase().indexOf(
    //       self.search.toLowerCase()
    //     )>=0;
    //   });
    // }
  },
  components: {
    globalSearch
  }
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

  &__search{
    height: 60px;
    position: fixed;
    width: 100%;
    background-color: #4B397A;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 400;
    box-shadow: 0 2px 25px rgba(0,0,0,.3);

    &__title{
      color: white;
      display:flex;
      margin-left: 40px;
      font-size: 32px;
      font-weight: bold;
      position: relative;
      .letters{
        position: relative;
        left: -25px;
      }
    }
    // &__title:hover .twitch, .screens{
    //   transition: all 0.5s;
    //   width:50px;
    //   margin-right: 60px;
    // }
    // &__title:hover .twitch:after{
    //   opacity: 1;
    //   left: 0px;
    // }
    //
    // &__title:hover .screens:after{
    //   opacity: 1;
    //   left: 0px;
    //   margin-left:0px;
    // }
    .hide{
      opacity: 0;
      position: relative;
    }
    .w{
      left: -8px;
      opacity: 1;
      transition: all 0.1s;
    }
    .i{
      left: -15px;
      opacity: 1;
      transition: all 0.1s linear 0.1s;
    }
    .t{
      left: -22px;
      opacity: 1;
      transition: all 0.1s linear 0.2s;
    }
    .c{
      left: -30px;
      opacity: 1;
      transition: all 0.1s linear 0.3s;
    }
    .h{
      left: -38px;
      opacity: 1;
      transition: all 0.1s linear 0.4s;
    }
    .s{
      left: -46px;
      opacity: 1;
      transition: all 0.1s linear 0.5s;
    }
    .screens{
      position: relative;
      left: -125px;
      transition: all 0.4s;
    }
    .sMove{
      left: 0px;
      transition: all 0.4s;
    }
    // .w:after {
    //   content:"w";
    //   position: relative;
    //   opacity: 0;
    //   left: -10px;
    //   transition: all 0.1s;
    // }
    // .t:after {
    //   content:"i";
    //   position: relative;
    //   opacity: 0;
    //   left: -10px;
    //   transition: all 0.2s;
    // }
    // .screens:after {
    //   content:"creens";
    //   position: relative;
    //   margin-left:40px;
    //   opacity: 0;
    //   left: -10px;
    //   transition: all 0.3s;
    // }

    // .twitch, .screens{
    //   transition: all 0.5s;
    //   margin-right: 5px;
    //   width:15px;
    // }
    .line{
      width: 20px;
      bottom:0;
      position: absolute;
      background: #AF91FF;
      height: 4px;
      border-radius: 10px;
    }
    &__title:hover .line{
      width: 250px;
      -webkit-transition: width 0.5s;
      transition: width 0.5s;
    }

  }

  ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-top: 80px;
    min-height: calc(100vh - 50px);
    background: #222222;
    margin-bottom: 0px;
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
        background-color: #1C232A;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        bottom: -110px;
        left: 0;
        right: 0;
        background: rgba(28,35,42, 0.80);
        color: #fff;
        transition: bottom 0.5s;
        padding-bottom: 5px;
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
