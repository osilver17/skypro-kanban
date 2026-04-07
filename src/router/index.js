import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'

const router = createRouter({

    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: HomeView,
                    children: [
                        {
                            path: '/exit', // Маршрут для окна выхода
                            component: () => import('@/views/ExitModal.vue')
                        },
                        {
                            path: '/browse/:id', // Маршрут для окна просмотра задачи
                            name: 'browse-card',
                            component: () => import('@/views/TaskBrowse.vue')
                        },
                        {
                            path: '/new-task', // Маршрут для окна новой задачи
                            component: () => import('@/views/TaskCreating.vue')
                        },
                        {
                            path: '/task-edit/:id', // Маршрут для окна редактирования задачи
                            name: 'edit-card',
                            component: () => import('@/views/TaskEditing.vue')
                        },
                    ],
                    meta: {
                        requiresAuth: true,
                    }
                },
                {
                    path: '/sign-in', // Маршрут для страницы входа
                    component: SignInView // Отдельный компонент для авторизации
                },
                {
                    path: '/sign-up', // Маршрут для страницы регистрации
                    component: SignUpView // Экран, позволяющий создать аккаунт
                },
                {
                    path: '/:pathMatch(.*)*',
                    component: () => import('@/views/NotFoundView.vue')
                }
            ]
        },
    ],
})

router.beforeEach((to) => {
    // Берем токен
    const token = localStorage.getItem('userInfo');

    // Проверяем, действительно ли на маршруте нужна авторизация и есть ли токен
    if (to.meta.requiresAuth && !token) {
        return '/sign-in'; // Если нет, уводим на страницу входа
    } else {
        return true; // Иначе пропускаем пользователя
    }
});

export default router
