<template>
  <div class="main-stream">
    <ul class="main-stream__ul">
      <input class="main-stream__ul__input" name="searchStream" placeholder="Search a stream" v-model="search"/>
      <li class="main-stream__ul__li" v-for="element in searchStream" v-on:click="selectStream(element)">
        <img class="main-stream__ul__li__img" :src=element.channel.logo>
        <div class="main-stream__ul__li__infos">
          <span class="main-stream__ul__li__infos__name">{{element.channel.display_name}}</span>
          <div class="main-stream__ul__li__infos__views">
            <div class="main-stream__ul__li__infos__views__online"></div>
            <span class="main-stream__ul__li__infos__views__viewers">{{element.viewers}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios';
import stream from './stream.vue';

export default {
  props: {
    list: Array
  },
  data: () => ({
    search:'',
    videoSelected: [],
    err:''
  }),


  methods: {
    selectStream (element, event) {
      const fullSrc = 'https://player.twitch.tv/?channel=' + element.channel.name;
      if (!this.videoSelected.includes(fullSrc)) {
        this.videoSelected.push(fullSrc);
        this.$emit('clicked', this.videoSelected)
        this.err = '';
      } else {
        this.err = 'La vidéo est déjà lancée my friend :)';
        this.$emit('clicked', this.err)
      }
    }
  },
  computed: {
    searchStream: function(){
      if(!this.list){
        return;
      }
      const videos = this.list;
      const self=this;
      return videos.filter((str) => {
        return str.channel.name.toLowerCase().indexOf(
          self.search.toLowerCase()
        )>=0;
      });
    }
  },

  components: {
    stream
  }

}
</script>

<style scoped lang="scss">
.main-stream{
  display: flex;
  width: 20%;
  position: absolute;
  margin-top: 62px;
  &__ul{
    display: flex;
    flex-direction: column;
    margin: 0px;
    padding: 0px;
    padding-left: 10px;
    background-color: #1c232a;
    color: white;
    list-style: none;
    &__input{
      height: 30px;
      width: 80%;
      margin: 10px;
    }
    &__li{
      cursor: pointer;
      display: flex;
      align-items: center;
      margin-top: 10px;
      border-bottom: 1px solid #545454;
      list-style: none;
      padding-right: 5px;
      &__img{
        height: 35px;
        margin-right: 10px;
      }
      &__infos{
        &__views{
          display: flex;
          align-items: center;
          &__online{
            height: 10px;
            width: 10px;
            border-radius: 10px;
            background-color: red;
            margin-right: 5px;
          }
        }
        &__name{
          word-break: break-all;
        }
      }

    }
    &__li:hover{
      background-color: lighten(#1c232a, 8%);
    }
  }
}
</style>
