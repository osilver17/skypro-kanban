<script setup>
import { ref } from 'vue'
const display = ref('none')
function showElem() {
    display.value = 'block'
}
</script>

<template>
    <main>
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
                    <a href="#popNewCard">Создать новую задачу</a>
                </button>
                <a href="#" class="header__user _hover02" @click="showElem">Ivan Ivanov</a>
                <div class="header__pop-user-set pop-user-set" :style="{ display: display }">
                    <!-- <a href="">x</a> -->
                    <p class="pop-user-set__name">Ivan Ivanov</p>
                    <p class="pop-user-set__mail">ivan.ivanov@gmail.com</p>
                    <div class="pop-user-set__theme">
                        <p>Темная тема</p>
                        <input type="checkbox" class="checkbox" name="checkbox" />
                    </div>
                    <button type="button" class="_hover03">
                        <a href="#popExit">Выйти</a>
                    </button>
                </div>
            </nav>
        </div>
    </main>
</template>

<style scoped>
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
</style>
