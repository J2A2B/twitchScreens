<template>
  <div class="main-menu">
    <div class="main-menu__search">
      <globalSearch :searchProps="searchProps"></globalSearch>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from 'vuex';
import store from '../store/store';
import * as type from '../store/mutationTypes/types';
import globalSearch from './global-search.vue';

export default {
  name: 'menuTop',
  props: {
    allGames: Array
  },
  data () {
    return {
      state: 'close',
      isShowSearch: false,
      gameSelected: '',
      search:'',
      gameList: [],
      searchProps: 'game'
    }
  },

  methods: {
    selectGame (value) {
      this.$store.commit('SET_GAME', value)
      this.gameSelected = value
      this.getStreams()
    },
    ...mapActions({
     getStreams: 'getStreams'
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
        // if (this.state ==='close') {
          this.isShowSearch = true;
          // this.search = '';
        // } else {
        //   if (self.search.length > 0) {
        //     this.isShowSearch = true;
        //   } else {
        //     this.isShowSearch = false;
        //   }
        // }
        return str.game.name.toLowerCase().indexOf(
          self.search.toLowerCase()
        )>=0;
      });
    }
  },
  components: {
    globalSearch
  }
}
</script>
<style scoped lang="scss">
.main-menu{
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__search{
    height: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-bottom: 10px;
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
  .manage-stream{

  }
}
</style>
