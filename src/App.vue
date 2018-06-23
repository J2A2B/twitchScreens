<template>
  <div id="app">
    <meta charset="utf-8">
    <link rel="shortcut icon" type="image" href="../static/assets/favicon-32x32.png"/>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">

<!--     <router-link :to="{ name: 'games' }">Games</router-link>
    <router-link to="/menu">menu</router-link> -->
    <router-view></router-view>
  </div>
</template>
<!-- <script src="https://embed.twitch.tv/embed/v1.js"></script> -->
<script>
export default {
  name: 'app'
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body{
  margin:0px;
 /* overflow: hidden;*/
}
</style>
