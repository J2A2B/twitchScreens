import Vue from 'vue'
import Router from 'vue-router'
import game from '@/components/game'
import home from '@/components/home'
import counter from '@/components/counter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/game:name',
      name: 'game',
      component: game,
      props: {game: true, content: false}
    },
    {
      path: '/counter',
      name: 'counter',
      component: counter
    }
  ]
})
