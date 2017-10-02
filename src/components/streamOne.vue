<template>
  <div>

    mon id : {{this.id}}
    
    <VueTwitchPlayer :channel="this.id" ref="myPlayer">
    </VueTwitchPlayer>

  </div>
</template>

<script>
  
import VueTwitchPlayer from 'vue-twitch-player'

export default {

    name: 'streamOne',

    components: {
      VueTwitchPlayer
    },

    props: {    
      id: String
    },

    data () {
      return {};
    }
   
}

</script>
