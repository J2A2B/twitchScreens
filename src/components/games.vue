<template>
  <div class="main-cont-games">
    <div class="cont-search">
      <div class="icon-search"></div>
      <input name="" placeholder="Search a game" v-model="search">
    </div>
    <ul>
      <li v-for="element in searchGame" :href="'#/screens/'+'element.game.name'">
        <img :src=element.game.box.large>
        <div class="cont-infos-game">
          <h2>{{element.game.name}}</h2>
          <p>{{element.viewers}} viewers</p>
          <p>{{element.channels}} channels</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import axios from 'axios'
  // import streamOne from './streamOne.vue'
  // import streamList from './streamList.vue'
  // import chat from './chat.vue'

  export default {
    name: 'menu',
    data: () => ({
      games: [],
      search:'',
      errors: []
    }),
  // Fetches posts when the component is created.
  created () {
    axios.get('/games')
    .then(response => {
      // JSON responses are automatically parsed.
      this.games = response.data.top
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
      const games = this.games
      const self=this;
      console.log(games)
      return games.filter(function(str){
        return str.game.name.toLowerCase().indexOf(self.search.toLowerCase())>=0;
      });
    }
  }
  // methods:{
  //   selectGame: function(){

  //   }
  // }
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
    height: 50px;
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
/*      background: url("../assets/search.svg") no-repeat left center ;
      background-size: 25px;
      background-color: white;
      background-origin: content-box;*/
      border: none;
      outline: none;
    }
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    cursor: pointer;
    min-height: calc(100vh - 50px);
    li{
      overflow: hidden;
      width: 20%;
      min-width: 30%;
      /*border: 1px solid #4B397A;
*/      margin: 5px;
      display: flex;
flex-direction:column;
position: relative;
img{
  width: 100%;
}
.cont-infos-game{
  z-index: 300;
  height: 80px;
/*  height: 100%;*/
  /*background-color: #4B397A;*/
  /*border: 1px solid #4B397A;*/
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

/*  height: 0;*/
/*  visibility: hidden;*/
/*  opacity: 0;*/
  transition: bottom 0.7s;
  button{
    background-color: transparent;
    font-size: 16px;
    font-weight: bold;
    color: white;
  }
  p{
/*    height: 0;*/
    text-align: center;
    margin-top: 5px;
    font-size:12px;
    color: #f6f6f6;
    /* color: #e91922;*/
  }
  h2{
  /*  height: 0;*/
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
  /*height: 10%;*/
/*  visibility: visible;
  opacity: 1;*/
}
}
}
</style>