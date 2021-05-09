import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'

  },
  {
   path:'/login',
   name:'login',
   component:()=>import('@/views/Login/login.vue'),
   
  },
  {
   path:'/home',
   name:'home',
   component:()=>import('@/views/Home/home.vue'),
   children:[
     {
       path:'/welcome',
       component:()=>import('@/views/Home/props/welcom.vue'),
       alias:'/home'
     },
     {
       path:'/users',
       component:()=>import('@/views/Home/props/Users.vue')
     },
     {
      path:'/goods',
      component:()=>import('@/views/Home/props/Goods.vue')
     },
     {
       path:'/reload',
       component:()=>import('@/views/Home/props/Reload.vue')
     }
   ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
