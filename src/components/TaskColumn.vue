<script setup>
import TaskCard from './TaskCard.vue'

const cardsStatus = ['card_NoStatus', 'card_NeedToDo', 'card_InWork', 'card_InTest', 'card_Done']

// Для отображения задач нужно раскомментировать строки 7, 8 и закомментировать 9-ю
// import { cardsAllStatus } from '@/mocks/tasks'
// const statusArrays = tasksDistributionByColumns(cardsStatus, cardsAllStatus)
const statusArrays = tasksDistributionByColumns(cardsStatus)

function tasksDistributionByColumns(statusArr, taskArr = []) {
    const statusArrays = []
    statusArr.forEach((element, id) => {
        statusArrays[id] = taskArr.filter((item) => item.status === element)
        if (statusArrays[id].length === 0)
            statusArrays[id].push({
                id: 0,
                topic: '',
                classColor: '',
                title: 'Задач нет',
                date: '',
                status: '',
            })
    })
    return statusArrays
}
</script>

<template>
    <div class="main__column column">
        <div class="column__title">
            <p>Без статуса</p>
        </div>

        <div class="cards" v-for="card in statusArrays[0]" :key="card.id">
            <TaskCard :classColor="card.classColor" :date="card.date" :topic="card.topic">{{
                card.title
            }}</TaskCard>
        </div>
    </div>
    <div class="main__column">
        <div class="column__title">
            <p>Нужно сделать</p>
        </div>
        <div class="cards" v-for="card in statusArrays[1]" :key="card.id">
            <TaskCard :classColor="card.classColor" :date="card.date" :topic="card.topic">{{
                card.title
            }}</TaskCard>
        </div>
    </div>
    <div class="main__column">
        <div class="column__title">
            <p>В работе</p>
        </div>
        <div class="cards" v-for="card in statusArrays[2]" :key="card.id">
            <TaskCard :classColor="card.classColor" :date="card.date" :topic="card.topic">{{
                card.title
            }}</TaskCard>
        </div>
    </div>
    <div class="main__column">
        <div class="column__title">
            <p>Тестирование</p>
        </div>
        <div class="cards" v-for="card in statusArrays[3]" :key="card.id">
            <TaskCard :classColor="card.classColor" :date="card.date" :topic="card.topic">{{
                card.title
            }}</TaskCard>
        </div>
    </div>
    <div class="main__column">
        <div class="column__title">
            <p>Готово</p>
        </div>
        <div class="cards" v-for="card in statusArrays[4]" :key="card.id">
            <TaskCard :classColor="card.classColor" :date="card.date" :topic="card.topic">{{
                card.title
            }}</TaskCard>
        </div>
    </div>
</template>

<style scoped>
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
