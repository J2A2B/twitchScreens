<template>
  <div class="main-cont-games">
    <div class="cont-search">
      <div class="icon-search"></div>
      <input name="searchGame" placeholder="Search a game" v-model="search">
    </div>
    <ul>
      <li v-for="element in searchGame">
        <router-link :to="{ name: 'game', params: { name: element.game.name }}">
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

export default {
  name: 'menu',
  data: () => ({
    games: [],
    search:'',
    errors: []
  }),

  created () {
    axios.get('/games')
    .then(response => {
      this.games = response.data.top;
    })
    .catch(e => {
      this.errors.push(e)
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
        return str.game.name.toLowerCase().indexOf(
          self.search.toLowerCase()
        )>=0;
      });
    }
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
  .cont-search{
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4B397A;
    position: fixed;
    z-index: 999;
    .icon-search{
      height: 28px;
      width: 25px;
      padding: 2px;
      background: url("../assets/search.svg") no-repeat center;
      background-size: 90%;
      background-color: white;
    }
    input{
      height: 30px;
      width: 30%;
      padding-left: 5px;
      border: none;
      outline: none;
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
