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
      <p><strong>{{element.channel.url}}</strong></p>
    </li>
  </ul>
<div id="liveStream"></div>
    <ScreenOne></ScreenOne>
    <ScreenTwo></ScreenTwo>
  </div>
</template>

<script>
  import axios from 'axios'
  import ScreenOne from './screenOne-component.vue'
  import ScreenTwo from './screenTwo-component.vue'

  export default {
    name: 'hello',
    data: () => ({
      games: [],
      streams: [],
      options: {
        width: 854,
        height: 480,
        channel: "lefourbetv"
      },
      errors: []
    }),

  // Fetches posts when the component is created.
    created () {
      axios.get('http://localhost:3000/games')
    .then(response => {
      // JSON responses are automatically parsed.
      this.games = response.data.top
      return this.games
      // return console.log(this.posts)
      // return this.posts
    })
    .catch(e => {
      this.errors.push(e)
    })
      axios.get('http://localhost:3000/streams')
    .then(response => {
      // JSON responses are automatically parsed.
      this.streams = response.data.streams
      return this.streams
      // return console.log(this.posts)
      // return this.posts
    })
    .catch(e => {
      this.errors.push(e)
    })
    },

    // postSreenOne () {
    //   axios.post('', {
    //     body: this.postBody
    //   })
    //   .then(response => {})
    //   .catch(e => {
    //     this.errors.push(e)
    //   })
    // },
    // data ()  {
    //   posts: [],
    //   errors: []
    // ),
    components: {
      ScreenOne,
      ScreenTwo
    },
  const player = new Twitch.Player("liveStream", options);
  player.setVolume(0.5);
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
<script src= "http://player.twitch.tv/js/embed/v1.js"></script>
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
