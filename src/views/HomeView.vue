<script setup>
import TaskDesk from '@/components/TaskDesk.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import NewCardModal from '@/components/NewCardModal.vue'
import ExitModal from '@/components/ExitModal.vue'
import TaskModal from '@/components/TaskModal.vue'
import PreLoader from '@/components/PreLoader.vue'
import { ref, onMounted } from 'vue'

const loading = ref(true)
// onMounted вызывается один раз
onMounted(() => {
    console.log('onMounted запущен')

    // Через 3 секунды значение станет false
    setTimeout(() => {
        loading.value = false
        console.log('setTimeout отработал. loading.value =', loading.value)
    }, 3000)
})
</script>

<template>
    <PreLoader v-if="loading" />
    <div v-else class="wrapper">
        <!-- pop-up start-->

        <div class="pop-exit" id="popExit">
            <div class="pop-exit__container">
                <ExitModal />
            </div>
        </div>

        <div class="pop-new-card" id="popNewCard">
            <div class="pop-new-card__container">
                <NewCardModal />
            </div>
        </div>

        <div class="pop-browse" id="popBrowse">
            <div class="pop-browse__container">
                <TaskModal />
            </div>
        </div>

        <!-- pop-up end-->

        <header class="header">
            <div class="container">
                <BaseHeader />
            </div>
        </header>
        <main class="main">
            <div class="container">
                <TaskDesk />
            </div>
        </main>
    </div>
</template>

<style scoped></style>
