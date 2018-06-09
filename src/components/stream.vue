<template>
  <span :videoName="videoName">
    <div ref="ref" class="main-stream"></div>
    {{controlAll}}
    {{videoName}}
    <span style="background:red" @click="removeOne">REMOVE</span>
    <!-- <i class="fas fa-gamepad"></i>
    <i class="fas fa-gamepad"></i>
    <i class="fas fa-gamepad"></i>
    <i class="fas fa-gamepad"></i> -->
  </span>
  <!-- <iframe class="main-stream" :src="videoName" width="100px" height="100px"></iframe> -->
</template>
<script>
import axios from 'axios';
import { mapState, mapActions } from 'vuex';
import Vue from 'vue';
import LoadScript from 'vue-plugin-load-script';

export default {
  props: {
    videoName: String
  },
  data () {
    return {
      streamList: this.videoName,
      player: null,
      ref: 'twitch-embed-' + Math.floor(Math.random() * 9999) + 1
    }
  },

  created(){
    console.log(this.videoName)
    Vue.loadScript('https://player.twitch.tv/js/embed/v1.js')
    .then(() => {
      const options = {
            width: 100,
            height: 100,
            channel: this.videoName,
            autoplay: true
          };
      this.player = new window.Twitch.Player(this.$refs.ref, options);
      this.player.addEventListener('ready', () => {

        console.log('stream created ready !!!!' )

      })
    })
  },
  // mounted: function () {
  //   Vue.loadScript('https://player.twitch.tv/js/embed/v1.js')
  //   .then(() => {
  //     const options = {
  //           width: 100,
  //           height: 100,
  //           channel: this.videoName
  //           // autoplay: true
  //         };
  //     this.player = new window.Twitch.Player(this.id, options);
  //     this.player.addEventListener('ready', () => {
  //
  //       console.log('stream created ready !!!!' )
  //
  //     })
  //   })
  // },

  computed: {
    controlAll: function(){

      if(!this.player){
        return;
      }
      if (this.$store.state.allStreamArePaused) {
        this.player.pause()
      } else {
        this.player.play()
      }
      this.player.setMuted(this.$store.state.allStreamAreMuted);
      // if (this.$store.state.allStreamAreRemoved === true) {
      //   this.player.addEventListener('ended', () => {
      //     console.log('closed !!!!' )
      //
      //   })
      // }
    }
  },
  methods: {
    removeOne () {
      this.removeOneStreamSelected({stream: this.videoName})
    },
    ...mapActions({
      removeOneStreamSelected: 'removeOneStreamSelected'
    })
  }


}
</script>

<style lang="scss">
    .main-stream iframe{
      width: 100%;
      height: calc(50vh - 60px);
    }
</style>
