<template>
  <div class="cont-video">

  </div>
</template>
<script>
  export default {
    name: 'videoList',
    props: {    
      id: String
    },
    data () {
      return {
        games: [],
        streams: [],
        errors: [],
        changeVideoOne: '',
        changeVideoTwo: ''
      }
    },
    methods: {
      selectStream: function (element, inputTarget) {
      }
    }

  </script>

</style>