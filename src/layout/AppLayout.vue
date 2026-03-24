<template>
    <RouterView />
</template>

<script setup>
import { provide, ref } from 'vue'

const loading = ref(false)
// ref(false) - флажок, показывающий, что идёт загрузка
const error = ref('')
// ref('') - строка для текста ошибки

// Передаём всем потомкам главной страницы данные о словах, загрузке и ошибке
provide('loading', { loading, error })

const userInfo = ref(null)

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

// Передаем наши данные во всё приложение:
// на главную страницу, на страницы входа и регистрацию
provide('auth', {
    userInfo: userInfo,
    setUser: setUserInfo,
    removeUser: removeUserInfo,
})
</script>

<style scoped></style>
