<script setup>
import TaskDesk from '@/views/TaskDesk.vue'
import BaseHeader from '@/views/BaseHeader.vue'
import PreLoader from '@/components/PreLoader.vue'
import { fetchTasks } from '@/services/api'
import { ref, onMounted } from 'vue'
import { cardsAllStatus } from '@/mocks/tasks'

const tasks = ref([])
// ref([]) - массив для задач
const loading = ref(false)
// ref(false) - флажок, показывающий, что идёт загрузка
const error = ref('')
// ref('') - строка для текста ошибки

const getTasks = async () => {
    try {
        loading.value = true
        const stringUserInfo = localStorage.getItem('userInfo')
        const userInfo = JSON.parse(stringUserInfo)
        const token = userInfo.token
        console.log('token =', token)

        const data = await fetchTasks({
            token: token,
        })
        if (data) {
            // Выясняем, что такое data
            console.log('data =', data)
            // Забираем из data массив задач в состояние tasks
            tasks.value = data.tasks
            console.log('tasks.value =', tasks.value)

            tasks.value.forEach((item) => {
                item.date = new Date(item.date)
                item.date = item.date.toLocaleDateString()
                switch (item.topic) {
                    case 'Web Design':
                        item.classColor = '_orange'
                        break
                    case 'Research':
                        item.classColor = '_green'
                        break
                    case 'Copywriting':
                        item.classColor = '_purple'
                        break

                    default:
                        break
                }
            })
            // Пушим массив задач из состояния tasks в наше глобальное состояние cardsAllStatus
            // Так как массив cardsAllStatus меняется только здесь, то пока это нормально
            cardsAllStatus.length = 0
            cardsAllStatus.push(...tasks.value)
        }
    } catch (err) {
        error.value = err
        alert(error.value)
    } finally {
        loading.value = false
    }
}

// onMounted вызывается один раз
onMounted(() => {
    console.log('onMounted запущен')

    getTasks()
    // // Через 1 секунду значение станет false
    // setTimeout(() => {
    //     loading.value = false
    //     console.log('setTimeout отработал. loading.value =', loading.value)
    // }, 1000)
})
</script>

<template>
    <PreLoader v-if="loading" />
    <div v-else class="wrapper">
        <!-- pop-up start-->

        <!-- pop-up end-->

        <BaseHeader />

        <main class="main">
            <TaskDesk />
        </main>
        <RouterView />
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
