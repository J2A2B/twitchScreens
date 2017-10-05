<template>
  <div class="hello">
<div class="cont-menu">
  <ul>
    <li v-for="element of games">
      <!-- <img v-bind:src="element.game.box.small"> -->
      <button type="button" v-on:click="selectStreamList(element)">{{element.game.name}}</button>
    </li>
  </ul>
</div>
<div class="cont-stream">
  <ul>
    <li v-for="element of streams" key="item.id">
      <p>{{element.channel.name}}</p>
      <button type="button" v-on:click="selectStreamOne(element, 'inputOne')">Stream 1</button>
      <button type="button" v-on:click="selectStreamOne(element, 'inputTwo')">Stream 2</button> 
    </li>
  </ul>
  </div>
  <streamOne :id="changeStreamOne"></streamOne>
  <streamOne :id="changeStreamTwo"></streamOne>
  </div>
</template>

<script>
  import axios from 'axios'
  import streamOne from './streamOne.vue'

  export default {
    name: 'hello',
    data: () => ({
      games: [],
      streams: [],
      errors: [],
      changeStreamOne: 'game2eye',
      changeStreamTwo: 'packam'
       //default stream
    }),
  // Fetches posts when the component is created.
    created () {
      axios.get('http://localhost:3000/games')
    .then(response => {
      // JSON responses are automatically parsed.
      this.games = response.data.top
      return this.games
    })
    .catch(e => {
      this.errors.push(e)
    })
    },
    methods: {
      selectStreamList: function(element){
        const name = element.game.name
        axios.get('http://localhost:3000/streams/' + name)
          .then(response => {
           // JSON responses are automatically parsed.
          this.streams = response.data.streams
          // return this.streams
          return console.log(this.streams)
          })
          .catch(e => {
          this.errors.push(e)
          })
      },
      selectStreamOne: function (element, inputTarget) {
        const src = 'https://player.twitch.tv/?channel='
        // const inputTarget = message
          console.log(inputTarget)
          if (inputTarget == 'inputOne') {
            this.changeStreamOne = src + element.channel.name;
            console.log(this.changeStreamOne)
          }else if(inputTarget == 'inputTwo'){
            // console.log(inputTarget)
            this.changeStreamTwo = src + element.channel.name;
            console.log(this.changeStreamTwo)
          }
      },
    },
    components: {
      streamOne
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.hello{
  display: flex;
}
ul {
  list-style-type: none;
  padding: 0;
  border: solid 1px black;
}
.cont-menu{
  width: 15%;
}


a {
  color: #42b983;
}
</style>
