<template>
  <div class="chat">
    <iframe frameborder="1" 
    scrolling="no" 
    id="chat_embed"
    :src="this.id">
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
  height: 45.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  margin:5px;
  iframe{
    height:80%;
    width: 80%;
    border: none;
  }
}
</style>