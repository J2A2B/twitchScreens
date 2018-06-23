<template>
  <span :videoName="videoName" v-if="videoName !== 'undefined'">
    <div ref="ref" class="main-stream">
      <div class="main-stream__remove" @click="removeOne">
        <i class="fas fa-times"></i>
      </div>
    </div>
    {{controlAll}}
  </span>
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
    .main-stream {
      cursor: pointer;
      position: relative;
      &__remove {
        position: absolute;
        right:0px;
        top: 0px;
        background: white;
        height: 20px;
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        i{
          color: red;
        }
      }
    }
</style>
