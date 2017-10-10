<template>
  <div class="chat">
    <iframe frameborder="1" 
    scrolling="no" 
    id="chat_embed"
    :src="this.id"
    width="350">
  </iframe>
</div>
</template>

<script>

  export default {
    name: 'chat',
    props: {    
      id: String
    },
    data () {
      return {};
    }
  }

</script>
<style scoped lang="scss">
.chat{
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  margin:5px;
  iframe{
    height:47vh;
  }
}
</style>