<template>
  <div class="cotainer">
    <div class="notification">
      <addCounter></addCounter>
      <removeCounter></removeCounter>
      <h1 class="title" align="center">
        {{ count }}
      </h1>
    </div>
  </div>
</template>
<script>
import addCounter from './addCounter.vue';
import removeCounter from './removeCounter.vue';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import { mapState } from 'vuex';

export default {
  // data () {
  //   return {
  //     count: 0
  //   }
  // },
  computed: mapState({
    count: state => state.count
  }),
  components : {
    addCounter,
    removeCounter
  }
}
</script>
