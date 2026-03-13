<script setup>
import TaskDesk from '@/components/TaskDesk.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import TaskCreating from '@/views/TaskCreating.vue'
import ExitModal from '@/views/ExitModal.vue'
import TaskBrowse from '@/views/TaskBrowse.vue'
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
    }, 100)
})
</script>

<template>
    <PreLoader v-if="loading" />
    <div v-else class="wrapper">
        <!-- pop-up start-->

        <ExitModal />

        <TaskCreating />

        <TaskBrowse />

        <BaseHeader />

        <main class="main">
            <TaskDesk />
        </main>
    </div>
</template>

<style scoped>
.wrapper {
    max-width: 100%;
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    background-color: #f1f1f1;
}

.main {
    width: 100%;
    background-color: #eaeef6;
}
</style>
