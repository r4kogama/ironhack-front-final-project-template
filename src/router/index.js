import { createRouter, createWebHistory } from 'vue-router';
import SignUpView from '../user/pages/SignUpView.vue';
import HomeComponent from '../commons/home/HomeComponent.vue';
import DashboardView from '../dashboard/pages/DashboardView.vue';
import PageNotFound from '../notfound/components/PageNotFound.vue';


  const routes = [
    { path: "/home", redirect: '/'},
    { path: "", name: 'home' ,component: HomeComponent},
    { path: "/register", name: "signUp", component: SignUpView },
    { path: "/dashboard", name: "dashboard", component: DashboardView },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: PageNotFound }, 
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;
