import { createRouter, createWebHistory } from "vue-router";


const routes = [

//Auth Routes
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Auth/Login.vue"),
    meta: {
      requiresAuth: false
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Auth/Register.vue"),
    meta: {
      requiresAuth: false
    },
  },

  // Dashboard route
  {
    path: "/app",
    name: "app",
    component: () => import("../components/Admin/Layout.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "/dashboard",
        name: "app.dashboard",
        component: () => import("../views/Admin/Dashboard.vue"),
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/product",
        name: "app.product",
        component: () => import("../views/Admin/Product/index.vue"),
        meta: {
          requiresAuth: true
        },
      },

    ],
  },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else if (requiresAuth && isAuthenticated) {
    // Redirect to the dashboard if the user is authenticated and hits the login route
    if (to.path === '/login') {
      next({ name: 'app.dashboard' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
