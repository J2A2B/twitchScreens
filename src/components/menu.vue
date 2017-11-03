<template>
  <div class="main-cont">
    <div class="main-cont-menu">
      <div class="cont-menu scrollbar" id="scroll-style">
        <a href="https://www.youtube.com/watch?v=wE0uhqaxS_E" target="_blank" class="game">
          <div class="game-img"></div>
          <p>TScreens</p>
          <!-- <div class="game-img"></div> -->
        </a>
        <ul>
          <li v-for="element in games">
            <img :src=element.game.box.large v-on:click="selectStreamList(element)">
            <button type="button" v-on:click="selectStreamList(element)">{{element.game.name}}</button>
            <p>{{element.viewers}} viewers</p>
          </li>
        </ul>
      </div>
      <streamList :id="showStreamList" :isShow="showList"></streamList>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import streamOne from './streamOne.vue'
  import streamList from './streamList.vue'
  import chat from './chat.vue'

  export default {
    name: 'menu',
    data: () => ({
      games: [],
      streams: [],
      errors: [],
      changeStreamOne: '',
      changeStreamTwo: '',
      showStreamList:'',
      showList:false
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
  methods: {
    selectStreamList: function(element){
      // this.isShow=true
      // console.log(isShow)
      const name = element.game.name
      axios.get('/streams/' + name)
      .then(response => {
           // JSON responses are automatically parsed.
           this.showStreamList = response.data.streams
           this.showList = true
           // document.getElementById('search-cont').style.display = "flex";
                     // const showStreamList = true;
           // document.getElementById('stream-list').style.display = "block";
          // return this.streams
        })
      .catch(e => {
        this.errors.push(e)
      })

    }
  },
  components: {
    streamOne,
    streamList,
    chat
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
}
p{
  margin: 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
.main-cont{
  background-color: #faf9fa;
  .main-cont-menu{
    display: flex;
    .cont-menu{
      height:100vh;
      width: 110px;
      background-color: #4b367c;
      color: white;
      overflow-y: scroll;
      ul{
        overflow: auto;
        margin-top:50px;
        li{
          display: flex;
          flex-direction: column;
          align-items: center;
          img{
            cursor: pointer;
            max-width: 95%;
            transition: all 0.3s;
          }
          img:hover  {
            transform: scale(1.05);
          }
          button {
            border: none;
            background-color: #4b367c;
            color: white;
            padding: 5px;
            cursor: pointer;
            text-align: center;
            font-size: 10px;
          }
          button:hover{
            color: #898395;
          }
          p{
            text-align: center;
            font-size: 10px;
            margin-bottom: 5px;
            color: #f6f6f6;
          }
        }
      }
      .game{
        width: 110px;
        position: fixed;
        background-color: #1C232A;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        text-decoration: none;
        z-index: 1000;
        .game-img{
          background-color: #EC1313;
          background: url("../assets/screen.svg") no-repeat center;
          background-size: cover;
          margin-right: 5px;
          margin-left: 5px;
          height: 15px;
          width: 15px;
        }
        p{
          text-align: center;
          margin-left: 5px;
          margin-right: 5px;
          color: white;
          font-size: 11px;
        }
      }
    }
    #scroll-style::-webkit-scrollbar-track
    {
      margin-top: 50px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      background-color: transparent;
    }
    #scroll-style::-webkit-scrollbar
    {
      width: 6px;
      background-color: transparent;
    }
    #scroll-style::-webkit-scrollbar-thumb
    {
      background-color: #000000;
    }
  }
}
</style>
