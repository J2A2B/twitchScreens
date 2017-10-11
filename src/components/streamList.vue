<template>
  <div class="cont-stream">
    <ul class="listStream scrollbar" id="stream-list" v-if="isShow">
   <!--    :class="{'streamListShow':isShow, 'streamListHidde': isShow }" -->
      <div class="cont-search" id="search-cont" v-if="isShow">
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
      id: '',
      isShow:''
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
        search:'',
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
        const chatSrc ="https://www.twitch.tv/"
        const channel = element.channel.name
        if (inputTarget == 'inputOne') {
          this.changeStreamOne = src + element.channel.name;
          this.changeChatOne = chatSrc + element.channel.name + "/chat";
          axios.get('/videos/' + channel +'/videos')
          .then(response => {
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
       this.isShow= false
       console.log(this.isShow)
        // this.isShow = false
        // const showStreamList = !showStreamList;
        // console.log(showStreamList)
        // document.getElementById('stream-list').style.display = "none";
      }
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
/*  .streamListHidde{
    display: none;
  }
  .streamListShow{
    display: block;
  }*/
  .listStream{
    margin-top: 0;
    width: 12vw;
    position: absolute;
    background-color: #1C232A;
    max-height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0px;
    .cont-search{
      position: fixed;
      background-color: #17141f;
      width: 12vw;
      display: flex;
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
        width: 60%;
      }
    }
    li{
      margin-top: 50px;
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
      .info-stream{
        margin-left: 5px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }
    .cont-button{
      display: flex;
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
    }
    p{
      margin: 0px;
      color: white;
      text-align: center; 
      text-overflow: ellipsis;
      /* white-space: nowrap;*/
      /*overflow: hidden;*/
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
  li:nth-child(2){
    margin-top: 60px;
  }
}
.cont-iframe{
  display: flex;
}
#stream-list::-webkit-scrollbar-track
{
  margin-top: 50px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: #1C232A;
}
#stream-list::-webkit-scrollbar
{
  width: 6px;
  background-color: #1C232A;
}
#stream-list::-webkit-scrollbar-thumb
{
  background-color: #4b367c;
}
}
</style>