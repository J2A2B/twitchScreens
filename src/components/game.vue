<template>
  <div class="container">
    <div class="container__main-game">
      <div class="container__main-game__header">
        <div class="container__main-game__header__game" v-on:click="showGames = !showGames">
          <i class="fas fa-gamepad"></i>
          <span class="container__main-game__header__game__title">{{this.gameName}}</span>
        </div>
      </div>
      <h1 class="container__main-game__title">Twitch Screens</h1>
      <div class="container__main-game__header right">
        <menuTop></menuTop>
      </div>
    </div>
    <streamList v-if="showGames === true"  :list="streamList" @clicked="onClickStream"></streamList>
    <ul class="container__ul">
      <li class="container__ul__li" v-for="element in videoSelected">
        <stream :videoLink="element"></stream>
      </li>
    </ul>
    <span v-if="err.length > 0">{{this.err}}</span>
  </div>
</template>
<script>
import axios from 'axios';
import menuTop from './menuTop.vue';
import streamList from './streamList.vue';
import stream from './stream.vue';

export default {
  name: 'game',
  data () {
    return {
      gameName: this.$route.params.name,
      showGames: false,
      streamList: [],
      videoSelected:[],
      err:''
    }
  },
  // Fetches posts when the component is created.
  created () {
    axios.get('/streams/' + this.gameName)
    .then(response => {
      this.streamList = response.data.streams;
    })
    .catch(err => {
      this.err
    })
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
    }
  },
  methods: {
    onClickStream (value) {
      if (Array.isArray(value)) {
        this.videoSelected = value;
      }else {
        console.log(value)
        this.err = value;
      }
    }
  },

  components: {
    menuTop,
    streamList,
    stream
  }
}
</script>

<style scoped lang="scss">
.container{
  display: flex;
  flex-direction: column;
  &__main-game{
    display:flex;
    border: 1px solid #5E19FF;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    border-radius: 2px;
    color: #222222;
    &__title{
      color: #4b367c;
    }
    &__header{
      display: flex;
      align-items: center;
      padding-right: 20px;
      padding-left: 20px;
      i{
        margin-right: 5px;
        color: #5E19FF;
      }
      &__game{
        cursor: pointer;
        box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
        padding: 5px;
        &__title{
          font-weight: bold;
        }
      }
    }
    .right{
      justify-content: flex-end;
    }
  }
  &__ul{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin: 0px;
    padding: 0px;
    &__li{
      width: 50%;
      height: 500px;
    }
  }
}

</style>
