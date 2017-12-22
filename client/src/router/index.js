import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: GoodsList
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
