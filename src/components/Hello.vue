<template>
  <div class="hello">
  <ul>
    <li v-for="element of games">
      <img v-bind:src="element.game.logo.large">
      <p><strong>{{element.game.name}}</strong></p>
    </li>
  </ul>
  <ul>
    <li v-for="element of streams">
      <a v-on:click="selectStream(element)">{{element.channel.name}}</a>
    </li>
  </ul>
  <streamOne :id="changeStream"></streamOne>
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
      changeStream: 'game2eye' //default stream
      //changeStream: this.streamName
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
      axios.get('http://localhost:3000/streams')
    .then(response => {
      // JSON responses are automatically parsed.
      this.streams = response.data.streams
      return this.streams
    })
    .catch(e => {
      this.errors.push(e)
    })
    },
    methods: {
      selectStream: function (el) {
        this.changeStream = el.channel.name;
      }
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

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
