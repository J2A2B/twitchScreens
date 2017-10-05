<template>
  <div class="player">

    mon id : {{this.id}}
    
<!--     <VueTwitchPlayer :channel="this.id" ref="myPlayer">
    </VueTwitchPlayer> -->
    <iframe :src="this.id" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>
    <!-- <iframe :src="this.id" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe> -->
  </div>
</template>

<script>
  
import VueTwitchPlayer from 'vue-twitch-player'

export default {

    name: 'streamOne',

    // components: {
    //   VueTwitchPlayer
    // },

    props: {    
      id: String
    },
    // methods: {
    //   streamOne: function () {
    //     return this.id
    //     console.log("coucou " +this.id)
    //   }
    // },
    data () {
      return {};
    }
   
}

</script>
<style scoped>
/*.player{
  display: none;
}*/
</style>