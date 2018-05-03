<template>
  <div class="main-cont-games">
    <div class="cont-search">
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
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'menu',
  data: () => ({
    search:'',
    searchList:[]
  }),

  computed: {
    searchGame: function(){
      if(!this.games){
        return;
      }
      const games = this.games;
      const self=this;

      return games.filter((str) => {
        return str.game.name.toLowerCase().indexOf(
          self.search.toLowerCase()
        )>=0;
      });
    }
  }
}
</script>

<style scoped lang="scss">

</style>
