<script setup>
import TaskCard from './TaskCard.vue'
import { cardsAllStatus } from '@/mocks/tasks'

const cardsStatus = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово']

function tasksDistributionByColumns(statusArr, taskArr = []) {
    const statusArrays = []
    statusArr.forEach((element, id) => {
        statusArrays[id] = taskArr.filter((item) => item.status === element)
        if (statusArrays[id].length === 0) {
            statusArrays[id].push({
                _id: '0',
                topic: '',
                classColor: '',
                title: 'Задач нет',
                date: '',
                status: '',
            })
        }
    })
    return statusArrays
}

const statusArrays = tasksDistributionByColumns(cardsStatus, cardsAllStatus)
</script>

<template>
    <div class="main__column" v-for="(column, index) in cardsStatus" :key="index">
        <div class="column__title">
            <p>{{ column }}</p>
        </div>
        <div class="cards">
            <TaskCard
                :cardId="card._id"
                :classColor="card.classColor"
                :date="card.date"
                :topic="card.topic"
                v-for="card in statusArrays[index]"
                :key="card._id"
                >{{ card.title }}</TaskCard
            >
        </div>
    </div>
</template>

<style scoped>
.blank {
    width: 100px;
    height: 100px;
    background-color: blueviolet;
}
.main__column {
    width: 20%;
    margin: 0 auto;
    display: block;
}

.column__title {
    padding: 0 10px;
    margin: 15px 0;
}
.column__title p {
    color: #94a6be;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
}

.cards {
    width: 100%;
    display: block;
    position: relative;
}

@media screen and (max-width: 1200px) {
    .main__column {
        width: 100%;
        margin: 0 auto;
        display: block;
    }

    .cards {
        width: 100%;
        display: flex;
        overflow-y: auto;
    }
}
</style>
