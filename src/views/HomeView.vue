<script setup>
import TaskDesk from '@/views/TaskDesk.vue'
import BaseHeader from '@/views/BaseHeader.vue'
import PreLoader from '@/components/PreLoader.vue'
import { fetchTasks } from '@/services/api'
import { inject, ref, onMounted, provide, computed } from 'vue'
import { deleteTask } from '@/services/api'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const id = computed(() => route.params.id)

const { userInfo } = inject('auth')
const { loading } = inject('loading')
const { error } = inject('loading')

// Массив статусов задач
const cardsStatus = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово']

// Массив для задач, не разбитых по статусам
const tasks = ref([])

// Массив массивов разбитых по статусам
const arrsOfStatuses = ref([])

function updateTasks(tasksFromServ) {
    console.log('HW: tasksFromServ =', tasksFromServ)
    tasks.value = tasksFromServ
}

function tasksDistributionByColumns(cardsStatus, tasksArr = []) {
    const arrsOfStatuses = []
    cardsStatus.forEach((element, id) => {
        arrsOfStatuses[id] = tasksArr.filter((item) => item.status === element)
        if (arrsOfStatuses[id].length === 0) {
            arrsOfStatuses[id].push({
                _id: '0',
                topic: '',
                classColor: '',
                title: 'Задач нет',
                date: null,
                status: '',
            })
        }
    })
    return arrsOfStatuses
}

const task = computed(() => {
    return (
        tasks.value.find((task) => task._id === id.value) || {
            _id: '0',
            topic: '',
            classColor: '',
            title: 'Задачи не существует',
            date: null,
            status: '',
        }
    )
})

// Функция, добавляющая поля для отрисовки категорий задач
function addTaskCategory(tasks) {
    tasks.forEach((item) => {
        item.date = new Date(item.date)
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
}

async function taskDeleter(event) {
    event.preventDefault()
    console.log('task.value._id =', task.value._id)

    try {
        loading.value = true
        userInfo.value = JSON.parse(localStorage.getItem('userInfo'))
        const token = userInfo.value.token
        console.log('token =', token)
        const data = await deleteTask(
            {
                token: token,
            },
            task.value._id,
        )
        if (data) {
            tasks.value.length = 0
            tasks.value.push(...data.tasks)

            addTaskCategory(tasks.value)
            // Заполняем массив данными
            arrsOfStatuses.value = tasksDistributionByColumns(cardsStatus, tasks.value)

            console.log('taskDeleter: tasks.value', tasks.value)
            router.push('/')
        }
    } catch (err) {
        error.value = err.message
        alert(error.value)
    } finally {
        loading.value = false
    }
}

async function getTasks() {
    try {
        loading.value = true
        userInfo.value = JSON.parse(localStorage.getItem('userInfo'))

        const token = userInfo.value.token
        console.log('token =', token)

        const data = await fetchTasks({
            token,
        })
        if (data) {
            // Выясняем, что такое data
            console.log('data в HomeView =', data)
            // Забираем из data массив задач в состояние tasks
            tasks.value = data.tasks
            console.log('HomeView: getTasks: tasks.value =', tasks.value)
            // Добавляем поля для рендеринга категорий
            addTaskCategory(tasks.value)
            // Заполняем массив данными
            arrsOfStatuses.value = tasksDistributionByColumns(cardsStatus, tasks.value)
            console.log('HomeView getTasks: arrsOfStatuses.value = ', arrsOfStatuses.value)
        }
    } catch (err) {
        console.log('err.message Home =', err.message)
        error.value = err
        alert(error.value.message)
        // router.push('/sign-in') // Отправляем на экран входа
    } finally {
        loading.value = false
    }
}

// onMounted вызывается один раз
onMounted(() => {
    console.log('onMounted запущен')
    // Получаем задачи от сервера
    getTasks()
})

provide('tasksData', {
    tasks,
    arrsOfStatuses,
    cardsStatus,
    updateTasks,
    tasksDistributionByColumns,
})

provide('getTasksProvide', getTasks)
provide('taskDeleter', taskDeleter)
provide('addTaskCategory', addTaskCategory)
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
