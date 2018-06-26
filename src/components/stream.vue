<template>
  <div :videoName="videoName" v-if="videoName !== 'undefined'">
    <div ref="ref" class="stream-open">
      <div class="stream-open__header">
        <div></div>
        <h4 class="stream-open__header__title-video">{{videoName}}</h4>
        <div class="stream-open__header__remove" @click="removeOne">
          <i class="fas fa-times"></i>
        </div>
      </div>
    </div>
    {{controlPlay}}
    {{controlMute}}
  </div>
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

  computed: {
    controlPlay: function(){

      if(!this.player){
        return;
      }
      if (this.$store.state.allStreamArePaused) {
        this.player.pause()
      } else {
        this.player.play()
      }
    },
    controlMute: function(){
      if(!this.player){
        return;
      }
      this.player.setMuted(this.$store.state.allStreamAreMuted);
    },

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
.stream-open iframe{
  width: 100%;
  height: calc(50vh - 60px);
}
.stream-open {

  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: flex-end;

  &__header{
    background: #4b367c;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__title-video{
      width:100%;
      text-align:center;
      color: white;
    }
    &__remove {
      margin-right: 5px;
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
}
</style>
