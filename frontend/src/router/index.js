import { createRouter, createWebHistory } from 'vue-router';
import NewsList from '../components/NewsList.vue';
import NewsDetail from '../components/NewsDetail.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

const routes = [
  {
    path: '/',
    name: 'NewsList',
    component: NewsList,
    meta: { requiresAuth: true }
  },
  {
    path: '/news/:id',
    name: 'NewsDetail',
    component: NewsDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresVisitor: true }  // Разрешаем только неаутентифицированным пользователям
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresVisitor: true }  // Разрешаем только неаутентифицированным пользователям
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const jwt = localStorage.getItem('jwt');

  // Если маршрут требует авторизации и JWT не найден
  if (to.matched.some(record => record.meta.requiresAuth) && !jwt) {
    next('/login');
  }
  // Если пользователь уже аутентифицирован, перенаправить его на главную
  else if (to.matched.some(record => record.meta.requiresVisitor) && jwt && to.name !== 'Login') {
    next('/');
  }
  else {
    next();  // Продолжить навигацию
  }
});
export default router;



