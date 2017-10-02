<template>
  <twitch-player :channel=channel>
  </twitch-player>
</template>

<script>
  // import Hello from './Hello.vue'
  import VueTwitchPlayer from 'vue-twitch-player'
export default {
    components: {
      'twitch-player': VueTwitchPlayer
    },
    data () {
      return {
        channel: this.channel
      }
    }
    // methods: {
    //   updateStream: function (updatedStream) {
    //     this.channel = updatedStream
    //   }
    // }
}
// this.$Hello.selectStream('coucou')
</script>
