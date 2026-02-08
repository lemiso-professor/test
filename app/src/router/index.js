import { createRouter, createWebHistory } from "vue-router";

// Only import what you actually have in your views folder
import AdventuresView from "../views/AdventuresView.vue";
import BookingView from "../views/BookingView.vue";
import SigninView from "../views/SigninView.vue";
import RegisterView from "../views/RegisterView.vue";
import DashboardView from "../views/DashboardView.vue";

const routes = [
  // Make the root path "/" load the AdventuresView
  { path: "/", name: "home", component: AdventuresView },
  { path: "/adventures", name: "adventures", component: AdventuresView },
  { path: "/booking", name: "booking", component: BookingView },
  { path: "/login", name: "login", component: SigninView },
  { path: "/register", name: "register", component: RegisterView },
  { path: "/dashboard", name: "dashboard", component: DashboardView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;