import TaskManagerView from "@/views/TaskManagerView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { push } from "notivue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TaskManagerView,
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/dang-ky",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/dang-nhap",
      name: "login",
      component: LoginView,
    },
  ],
});

router.beforeEach(async (to, form, next) => {
  const authStore = useAuthStore();

  if (
    authStore.isAuthenticated &&
    (to.name === "login" || to.name === "register")
  ) {
    return next({ name: "home" });
  }

  if (
    to.matched.some((route) => route.meta.isAuth) &&
    !authStore.isAuthenticated
  ) {
    push.warning("Bạn cần phải đăng nhập");
    return next({ name: "login" });
  }

  return next();
});

export default router;
