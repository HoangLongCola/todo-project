import TaskManagerView from '@/views/TaskManagerView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const isAuthenticated = () => {
  return localStorage.getItem('access_token')
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TaskManagerView,
      meta: {
        isAuth: true
      }
    },
    {
      path: "/dang-ky",
      name: "register",
      component: RegisterView
    },
    {
      path: "/dang-nhap",
      name: "login",
      component: LoginView
    }
  ]
})

router.beforeEach(async (to, form, next) => {
  if(to.matched.some(route => route.meta.isAuth) && !isAuthenticated()){
    return next('/dang-nhap');
  }else{
    return next();
  }
})

export default router
