import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import Users from '../components/user/users.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'//重定向,直接定到登录界面
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      //路由重定向
      redirect:'/welcome',
      children:[
        {
          path: '/welcome',
          component: Welcome
        },
        {
          path: '/users',
          component: Users
        }
      ]
    }
  ]
})
//挂载路由导航守卫
router.beforeEach((to,from,next) => {
  //to将要访问的路径
  //from代表从哪个路径跳转而来
  //next表示放行 next()放行  next('/login')强制跳转 
  if(to.path === '/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login') //token不存在
  next()
})
//暴露出去
export default router
