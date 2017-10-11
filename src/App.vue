<template>
  <div id="app">
    <link rel="shortcut icon" type="image/png" href="./assets/twitch-logo.png"/>
    <router-view></router-view>
  </div>
</template>

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
  overflow: hidden;
}
</style>
