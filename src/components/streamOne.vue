<template>
  <div class="player">
<!--     <div class="cont-play">
      <h2>Stream 1</h2>
      <div class="play"></div>
    </div> -->
    <iframe :src="this.id" frameborder="0" allowfullscreen="true" scrolling="no"></iframe>
  </div>
</template>

<script>
  export default {
    name: 'streamOne',
    props: {    
      id: String
    },
    data () {
      return {};
    }
  }
</script>
<style scoped lang="scss">
.player{
  display: flex;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  margin: 5px;
  .cont-play{
    position: absolute;
    top:0 ;
    bottom: 40%;
    left: 0;
    right: 0;
    margin:auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .play{
      background: url("../assets/play.svg") no-repeat center;
      background-size: cover;
      height: 100px;
      width: 100px;
    }
    h2{
      width: 50%;
      text-align: center
    }
  }
}
iframe{
  height: 51vh;
  width: 43vw;

}
</style>