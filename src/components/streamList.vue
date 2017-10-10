<template>
  <div class="cont-stream">
    <ul class="list-stream" id="stream-list">
      <div class="cont-search" id="search-cont">
        <input type="text" placeholder="search stream" v-model="search" >
        <div class="cont-close" v-on:click="closeListStream"></div>
      </div>
      <li v-for="element in searchStream" key="item.id">
        <div class="cont-info-stream">
          <img :src="element.channel.logo">
          <div class="info-stream">
            <p>{{element.channel.display_name}}</p>
            <div class="cont-views">
              <div class="circle"></div>
              <p>{{element.viewers}}</p>
            </div>
          </div>
        </div>
        <div class="cont-button">
          <button type="button" v-on:click="selectStream(element, 'inputOne')" class="btn-stream">Stream 1</button>
          <button type="button" v-on:click="selectStream(element, 'inputTwo')" class="btn-stream">Stream 2</button> 
        </div>
        <div class="line"></div>
      </li>
    </ul>
    <div class="cont-iframe">
      <div>
        <streamOne :id="changeStreamOne"></streamOne>
        <chat :id="changeChatOne"></chat>     
      </div>
      <div>
        <streamOne :id="changeStreamTwo"></streamOne>
        <chat :id="changeChatTwo"></chat>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import streamOne from './streamOne.vue'
  import chat from './chat.vue'
  export default {
    name: 'streamList',
    props: {    
      id: String
    },
    data () {
      return {
        games: [],
        streams: [],
        errors: [],
        changeStreamOne: '',
        changeStreamTwo: '',
        changeChatOne:'',
        changeChatTwo:'',
        changeVideoOne: '',
        changeVideoTwo: '',
        search:''
      }
    },
    computed: {
      searchStream: function(){
        if(!this.id){
          return;
        }
        const stream = this.id
        const self=this;
        return stream.filter(function(str){
          return str.channel.name.toLowerCase().indexOf(self.search.toLowerCase())>=0;
        });
      }
    },
    methods: {
      selectStream: function (element, inputTarget) {
        const src = 'https://player.twitch.tv/?channel='
        const chatSrc ="http://www.twitch.tv/"
        const channel = element.channel.name
        if (inputTarget == 'inputOne') {
          this.changeStreamOne = src + element.channel.name;
          this.changeChatOne = chatSrc + element.channel.name + "/chat";
          axios.get('http://localhost:3000/videos/' + channel +'/videos')
          .then(response => {
            console.log(response)
            this.changeVideoOne = channel

          })
          .catch(e => {
            this.errors.push(e)
          })
        }else if(inputTarget == 'inputTwo'){
          this.changeStreamTwo = src + element.channel.name;
          this.changeChatTwo = chatSrc + element.channel.name + "/chat";
        }
      },
      closeListStream: function(){
        document.getElementById('stream-list').style.display = "none";
      },
      // searchStream: function(){
      //     // var self=this;
      //     //console.log(this.id[0].channel)
      //     // return this.streams.filter(function(str){
      //     //   return str.name.toLowerCase().indexOf(self.search.toLowerCase())>=0;
      //     // });
      //   }
    },
    components: {
      streamOne,
      chat
    }
  }

</script>
<style scoped lang="scss">
.cont-stream{
  display: flex;
  .list-stream{
    margin-top: 0px;
    position: absolute;
    background-color: #1C232A;
    max-height: calc(100vh);
    overflow: scroll;
    padding: 0px;
    .cont-search{
      background-color: #17141f;
      width: 100%;
      display: none;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      .cont-close{
        background: url("../assets/cross.svg") no-repeat center;
        background-size: cover;
        height: 20px;
        width: 20px;
        margin-right: 10px;
        cursor: pointer;
      }
      input{
        height: 25px;
        margin-left: 10px;
      }
    }
    li{
      display: flex;
      flex-direction: column;
      /* text-align: center;*/
      margin-bottom: 5px;
      margin-top: 5px;
      .cont-info-stream{
       padding-left: 10px;
       padding-right: 10px;
       display: flex;
       align-items: center;
       img{
        margin-right: 5px;
        height: 30px;
        width: 30px;
      }
      .cont-button{
        display: flex;
        justify-content: space-around;
      }
      .info-stream{
        margin-left: 5px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }
    p{
      margin: 0px;
      color: white;
      text-align: center; 
    }
    .cont-views{
      display: flex;
      justify-content: center;
      align-items: center;
      .circle{
        background: url("../assets/circle.svg") no-repeat center;
        background-size: cover;
        height: 10px;
        width: 10px;
        margin-right: 5px;
      }
      p{
        margin-left: 5px;
        font-size: 12px;
      } 
    }
    .line{
      border-top: 1px solid #2c2541;
      margin-top: 5px;
    }
  }
}

}

.btn-stream{
  border-style: none;
  border: none;
  background-color: #17141f;
  color: white;
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
}
.btn-stream:hover{
  color: #ec1313;
}
.cont-iframe{
  display: flex;
}
</style>