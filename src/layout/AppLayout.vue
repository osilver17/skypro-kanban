<template>
    <RouterView />
</template>

<script setup>
import { provide, ref } from 'vue'

const userInfo = ref(null)

// Функция, которая сохраняет данные о пользователе в состояние и ЛС
function setUserInfo(value) {
    userInfo.value = value
    try {
        localStorage.setItem('userInfo', JSON.stringify(value))
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

// Передаем наши данные во всё приложение:
// на главную страницу, на страницы входа и регистрацию
provide('auth', {
    user: userInfo,
    setUser: setUserInfo,
    removeUser: removeUserInfo,
})
</script>

<style scoped></style>
