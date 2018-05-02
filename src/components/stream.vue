<template>
    <iframe class="main-stream" :src="streamList" width="" height=""></iframe>
</template>
<script>
import axios from 'axios';

export default {
  props: {
    videoLink: String
  },
  data () {
    return {
      streamList: this.videoLink
    }
  }

}
</script>

<style scoped lang="scss">
    .main-stream{
      width: 100%;
      height: 100%;
    }
</style>
