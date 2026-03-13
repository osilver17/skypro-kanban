import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'

const router = createRouter({

    history: createWebHistory(import.meta.env.BASE_URL),


    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            children: [
                {
                    path: '/exit', // Маршрут для окна выхода
                    component: () => import('@/views/ExitModal.vue')
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

    ],
})

export default router
