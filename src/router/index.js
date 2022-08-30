import { createRouter, createWebHistory } from 'vue-router';
import SignUpView from '../user/pages/SignUpView.vue';
import SignInView from '../user/pages/SignInView.vue';
import SignInView from '../dashboard/pages/DashboardView.vue';


  const routes = [
    { path: "/", name: "SignIn", component: SignInView},
    { path: "/register", name: "SignUp", component: SignUpView },
    { path: "/dashboard", name: "Dashboard", component: DashboardView },
  ]


const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;
