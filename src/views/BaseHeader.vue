<script setup>
import { ref } from 'vue'
import UserSet from '@/views/UserSet.vue'

const isVisible = ref('false')
function showUserSet() {
    isVisible.value = !isVisible.value
}
</script>

<template>
    <header class="header">
        <div class="container">
            <div class="header__block">
                <div class="header__logo _show _light">
                    <a href="" target="_self"
                        ><img src="../../public/assets/images/logo.png" alt="logo"
                    /></a>
                </div>
                <div class="header__logo _dark">
                    <a href="" target="_self"
                        ><img src="../../public/assets/images/logo_dark.png" alt="logo"
                    /></a>
                </div>
                <nav class="header__nav">
                    <button class="header__btn-main-new _hover01" id="btnMainNew">
                        <RouterLink to="/new-task">Создать новую задачу</RouterLink>
                    </button>
                    <a href="#" class="header__user _hover02" @click="showUserSet">Ivan Ivanov</a>
                    <UserSet v-show="!isVisible" />
                </nav>
            </div>
        </div>
    </header>
</template>

<style scoped>
.container {
    max-width: 1260px;
    width: 100%;
    margin: 0 auto;
    padding: 0 30px;
}

.header {
    width: 100%;
    margin: 0 auto;
    background-color: #ffffff;
}

.header__block {
    height: 70px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    position: relative;
    top: 0;
    left: 0;
    padding: 0 10px;
}

.header__logo img {
    width: 85px;
}

.header__nav {
    max-width: 290px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.header__btn-main-new {
    width: 178px;
    height: 30px;
    border-radius: 4px;
    background-color: #565eef;
    color: #ffffff;
    border: none;
    font-size: 14px;
    line-height: 1;
    font-weight: 500;
    margin-right: 20px;
}

.header__btn-main-new a {
    color: #ffffff;
}

._dark {
    display: none;
}

._hover02:hover,
.header__user:hover {
    color: #33399b;
}
._hover02:hover::after,
.header__user:hover::after {
    border-left-color: #33399b;
    border-bottom-color: #33399b;
}

.header__user {
    height: 20px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 20px;
    color: #565eef;
}
.header__user::after {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 1px;
    border-left: 1.9px solid #565eef;
    border-bottom: 1.9px solid #565eef;
    transform: rotate(-45deg);
    margin: -6px 0 0 5px;
    padding: 0;
}

._hover01:hover {
    background-color: #33399b;
}

@media screen and (max-width: 495px) {
    .header__btn-main-new {
        z-index: 3;
        position: fixed;
        left: 16px;
        bottom: 30px;
        top: auto;
        width: calc(100vw - 32px);
        height: 40px;
        border-radius: 4px;
        margin-right: 0;
    }
}

@media screen and (max-width: 495px) {
    .container {
        width: 100%;
        padding: 0 16px;
    }
}
</style>
