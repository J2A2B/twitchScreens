<template>
  <div class="main-cont">
      <div class="main-cont-menu">
        <div class="cont-menu">
          <div class="game">
            <div class="game-img"></div>
            <p>Twitch Screens</p>
            <div class="game-img"></div>
          </div>
          <ul>
            <li v-for="element in games">
              <img :src=element.game.logo.medium v-on:click="selectStreamList(element)">
              <button type="button" v-on:click="selectStreamList(element)">{{element.game.name}}</button>
            </li>
          </ul>
        </div>
        <streamList :id="showStreamList"></streamList>
      </div>
    </div>
  </template>

  <script>
    import axios from 'axios'
    import streamOne from './streamOne.vue'
    import streamList from './streamList.vue'
    import chat from './chat.vue'

    export default {
      name: 'hello',
      data: () => ({
        games: [],
        streams: [],
        errors: [],
        changeStreamOne: '',
        changeStreamTwo: '',
        showStreamList:''
       //default stream
     }),
  // Fetches posts when the component is created.
  created () {
    axios.get('http://localhost:3000/games')
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
      document.getElementById('stream-list').style.display = "block";
      document.getElementById('search-cont').style.display = "flex";
      const name = element.game.name
      axios.get('http://localhost:3000/streams/' + name)
      .then(response => {
           // JSON responses are automatically parsed.
           this.showStreamList = response.data.streams
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

.main-cont{
  background-color: #faf9fa;
    .main-cont-menu{
      display: flex;
      .cont-menu{
        height: calc(100vh);
        background-color: #4b367c;
        color: white;
        overflow: scroll;
        ul{
          li{
            display: flex;
            flex-direction: column;
            img{
              cursor: pointer;
              width: 100%;
            }
            button {
              border: none;
              background-color: #4b367c;
              color: white;
              padding: 5px;
              cursor: pointer;
              text-align: center;
            }
            button:hover{
              color: #898395;
            }
          }
        }
        .game{
          background-color: #1C232A;
          /*background-color: #17141f;*/
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
          .game-img{
            background-color: #EC1313;
            background: url("../assets/screen.svg") no-repeat center;
            background-size: cover;
            margin-right: 10px;
            margin-left: 10px;
            height: 15px;
            width: 15px;
          }
          p{
            text-align: center;
            margin-left: 5px;
            margin: 0;
            color: white;
            font-size: 11px;
          }
        }
      }
    }
  }
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
</style>
