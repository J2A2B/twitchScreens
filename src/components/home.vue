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
      <div class="main-cont-games__search__cont-search">
        <label :data-state="state" for="search">
          <input class="inputText"
          placeholder="Search a game"
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
        <ul class="main-cont-games__search__cont-search__ul">
          <li class="main-cont-games__search__cont-search__ul__li"
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
      <!-- <globalSearch :searchProps="searchProps"></globalSearch> -->
    </div>
    <ul class="main-cont-games__ul">
      <li class="main-cont-games__ul__li" v-for="element in this.$store.state.gameList">
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
      errors: [],
      show: false,
      search:'',
      state: 'close'
    }
  },
  created() {
    this.getGames()
    this.$store.state.gameSelected = ''
  },
  methods: {
    setSelectedGame (game) {
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
      &__cont-search{
        position: relative;
        display: flex;
        justify-content: center;
        margin-right: 40px;
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
            top: 18px;
            right: 15px;
            color: #333;
            cursor: pointer;
          }
          &[data-state="close"]{
            border-radius: 30px;
            padding: 5px 10px;
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
        height: 25px;
      }

      .floating-label {
        position: absolute;
        pointer-events: none;
        left: 20px;
        top: 18px;
        transition: 0.2s ease all;
      }

  }


  &__ul{
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
    &__li{
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
