<template>
  <div class="main-menu">
    <div class="main-menu__search">
      <label :data-state="state" for="search">
        <input
        class="main-menu__search__input"
        name="searchGame"
        placeholder="Search a game"
        v-model="search"
        @click="state = 'open'"
        @blur="state='close'"
        >
        <i class="fa fa-search" @click="" aria-hidden="true"></i>
      </label>
      <ul class="main-menu__search__ul">
        <li class="main-menu__search__ul__li" v-if="isShowSearch" v-for="element in searchGame">
          {{element.game.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'menuTop',
  props: {
    allGames: Array
  },
  data () {
    return {
      state: 'close',
      isShowSearch: false,
      search:'',
      gameList: []
    }
  },
  created () {
    axios.get('/games')
    .then(response => {
      this.gameList = response.data.top;
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  computed: {
    searchGame: function(){
      if(!this.gameList){
        return;
      }
      const gameList = this.gameList;
      const self=this;
      return gameList.filter((str) => {
        if (this.state ==='close') {
          this.isShowSearch = false;
          this.search = '';
        } else {
          if (self.search.length > 0) {
            this.isShowSearch = true;
          } else {
            this.isShowSearch = false;
          }
        }
        return str.game.name.toLowerCase().indexOf(
          self.search.toLowerCase()
        )>=0;
      });
    }
  }

}
</script>
<style scoped lang="scss">
.main-menu{
  display: flex;
  justify-content: center;
  align-items: center;

  &__search{
    height: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-bottom: 10px;
    label{
      position: relative;
      display: inline-block;
      background-color: #fff;
      padding: 5px 12px;
      transition: all 0.5s ease;
      border-radius: 0;
      box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
      &::after{
        content: '';
        display: block;
        height: 2px;
        width: 80%;
        background-color: #5E19FF;
        transition: all 0.5s ease 0.5s;
      }
      input{
        transition: width 1s ease, opacity 0.5s ease 0.5s;
        opacity: 1;
        width: 180px;
        height: 25px;
        border: 0;
        outline: none;
        color: darken(#5E19FF, 25)
      }
      i{
        position: absolute;
        top: 11px;
        right: 11px;
        color: #333;
        cursor: pointer;
      }
      &[data-state="close"]{
        border-radius: 30px;
        padding: 5px 5px;
        transition: all 1s ease;
        &::after{
          width: 0%;
          transition: all 0.3s ease;
        }
        i{
          pointer-events: none;
        }
        input{
          width: 28px;
          height: 25px;
          opacity:0;
          cursor: pointer;
          transition: opacity 0.5s ease, width 1s ease;
          -webkit-appearance:none
        }
      }
    }
    &__ul{
      width: 100%;
      min-width: 200px;
      max-height: 500px;
      overflow-y: scroll;
      position: absolute;
      margin: auto;
      margin-top: 50px;
      list-style: none;
      background-color: rgba(34, 34, 34, 0.1);
      border-radius: 2px;
      &__li{
        padding:5px;
        color: #222222;
      }
    }
  }
}
</style>
