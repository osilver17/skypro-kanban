<template>
    <RouterView />
</template>

<script setup>
import { provide, ref } from 'vue'
// Устанавливаем начальную тему приложения
const isDark = ref(false)

// Флаг загрузки
const loading = ref(false)

// Строка для текста ошибки
const error = ref('')

const userInfo = ref(null)
userInfo.value = JSON.parse(localStorage.getItem('userInfo'))

// Передаём всем потомкам главной страницы данные
provide('theme', isDark)
provide('loading', { loading, error })

provide('auth', {
    userInfo: userInfo,
    setUser: setUserInfo,
    removeUser: removeUserInfo,
})

// Функция, которая сохраняет данные о пользователе в состояние и ЛС
function setUserInfo(value) {
    try {
        localStorage.setItem('userInfo', JSON.stringify(value))
        userInfo.value = JSON.parse(localStorage.getItem('userInfo'))
        console.log('AppLayout: userInfo.value =', userInfo.value)
    } catch (e) {
        console.error('ошибка:', e)
        return null
    }
}

// Функция, которая удаляет данные о пользователе из состояния и ЛС
function removeUserInfo() {
    userInfo.value = null
    try {
        localStorage.removeItem('userInfo')
    } catch (e) {
        console.error('ошибка:', e)
    }
}
</script>

<style></style>
