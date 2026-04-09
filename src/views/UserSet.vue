<script setup>
import { inject } from 'vue'
const { userInfo } = inject('auth')
const isDark = inject('theme')
console.log('userInfo.value =', userInfo.value)

function toggleTheme() {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value)
    if (isDark.value) {
        document.getElementsByTagName('html')[0].style.color = '#ffffff'
        document.body.style.color = '#ffffff'
    } else {
        document.getElementsByTagName('html')[0].style.color = '#000000'
        document.body.style.color = '#000000'
    }
    console.log('UserSet: toggleTheme: isDark.value =', isDark.value)
}

function showUserName() {
    if (!(userInfo.value === null)) {
        return userInfo.value.name
    }
    return
}

function showUserLogin() {
    if (!(userInfo.value === null)) {
        return userInfo.value.login
    }
    return
}
</script>

<template>
    <div class="header__pop-user-set pop-user-set">
        <!-- <a href="">x</a> -->
        <p class="pop-user-set__name">{{ showUserName() }}</p>
        <p class="pop-user-set__mail">{{ showUserLogin() }}</p>
        <div class="pop-user-set__theme">
            <p>Темная тема</p>
            <input type="checkbox" class="checkbox" name="checkbox" @click="toggleTheme" />
        </div>
        <button
            type="button"
            :class="{ _hover03: !isDark, '_hover03-dark': isDark }"
            @click="!isVisible"
        >
            <RouterLink to="/exit">Выйти</RouterLink>
        </button>
    </div>
</template>

<style scoped>
.checkbox {
    cursor: pointer;
}
.header__pop-user-set {
    position: absolute;
    top: 61px;
    right: 0;
    width: 213px;
    height: 205px;
    border-radius: 10px;
    border: 0.7px solid rgba(148, 166, 190, 0.4);
    background: #fff;
    box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
    padding: 34px;
    text-align: center;
    z-index: 2;
}

.pop-user-set:target {
    display: block;
}

.pop-user-set__name {
    color: #000;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: -0.14px;
    margin-bottom: 4px;
}
.pop-user-set__mail {
    color: #94a6be;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.14px;
    margin-bottom: 10px;
}
.pop-user-set__theme {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
}
.pop-user-set__theme p {
    color: #000;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.14px;
}
.pop-user-set__theme input[type='checkbox'] {
    position: relative;
    width: 24px;
    height: 13px;
    border-radius: 100px;
    background: #eaeef6;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
.pop-user-set__theme input[type='checkbox']::before {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: #94a6be;
    transition: 0.5s;
}
.pop-user-set__theme input:checked[type='checkbox']::before {
    left: 12px;
}
.pop-user-set button {
    width: 72px;
    height: 30px;
    background: transparent;
    color: #565eef;
    border-radius: 4px;
    border: 1px solid #565eef;
}
.pop-user-set button a {
    color: #565eef;
}

._hover03:hover {
    background-color: #33399b;
    color: #ffffff;
}
._hover03:hover a {
    color: #ffffff;
}
._hover03-dark:hover {
    background-color: #565eef;
    color: #ffffff;
    border-color: #565eef;
}
._hover03-dark:hover a {
    color: #ffffff;
}
</style>
