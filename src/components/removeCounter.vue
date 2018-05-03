<template>
  <div class="container">
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-primary" v-on:click="removeCount()">Remove</button>
      </div>
  </div>
  </div>
</template>

<script>
import store from '../store/store';
import * as type from '../store/mutationTypes/types';

  export default {
    name: 'removeCounter',
    methods: {
        removeCount(){
          store.dispatch({
            type: type.Decrement,
            amount: 20
          })
        }
    }
  }
</script>
