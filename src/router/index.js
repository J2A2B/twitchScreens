import Vue from 'vue'
import Router from 'vue-router'
import menu from '@/components/menu'
import games from '@/components/games'

Vue.use(Router)

export default new Router({
  routes: [
      {
      path: '/',
      name: 'games',
      component: games
    },
    {
      path: '/screens/:id',
      name: 'screens',
      component: menu
    }
  ]
})
