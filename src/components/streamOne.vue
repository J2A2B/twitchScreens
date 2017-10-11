<template>
  <div class="player">
<!--     <div class="cont-play">
      <h2>Stream 1</h2>
      <div class="play"></div>
    </div> -->
    <iframe :src="this.id" frameborder="0" allowfullscreen="true" scrolling="no" id="myVideo"></iframe>
    <button type="submit" v-on:click="muteStream">coucou</button>
  </div>
</template>
<script src= "http://player.twitch.tv/js/embed/v1.js"></script>
<script>
  export default {
    name: 'streamOne',
    props: {    
      id: String
    },
    data () {
      return {};
    },
    methods: {
      muteStream: function () {
        const myVideo =  document.getElementById('myVideo')
        myVideo.pause();
        // myVideo.muted =true;
        //        const player = new Twitch.Player("myVideo", options);
        // myVideo.setVolume(0.5);
      
      //  if(myVideo.isMuted()){
      //   myVideo.unMute()
      // }else{
      //   myVideo.mute()
      // }
    }
  }
}
</script>
<style scoped lang="scss">
.player{
  display: flex;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  margin: 5px;
  width: 45.4vw;
  height: 51.5vh;
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
  height: 100%;
  /*height: 51vh;*/
  width: 100%;

}
</style>