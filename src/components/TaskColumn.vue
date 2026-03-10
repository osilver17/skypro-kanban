<script setup>
import TaskCard from './TaskCard.vue'
import { cardsAllStatus } from '@/mocks/tasks'

const cardsNoStatus = cardsAllStatus.filter((item) => item.status === 'card_NoStatus')
const cardsNeedToDo = cardsAllStatus.filter((item) => item.status === 'card_NeedToDo')
const cardsInWork = cardsAllStatus.filter((item) => item.status === 'card_InWork')
const cardsTesting = cardsAllStatus.filter((item) => item.status === 'card_InTest')
const cardsDone = cardsAllStatus.filter((item) => item.status === 'card_Done')
</script>

<template>
    <div class="main__column column">
        <div class="column__title">
            <p>Без статуса</p>
        </div>

        <div class="cards" v-for="card in cardsNoStatus" :key="card.id">
            <TaskCard :classColor="card.classColor" :date="card.date" :topic="card.topic">{{
                card.title
            }}</TaskCard>
        </div>
    </div>
    <div class="main__column">
        <div class="column__title">
            <p>Нужно сделать</p>
        </div>
        <div class="cards" v-for="card in cardsNeedToDo" :key="card.id">
            <TaskCard :classColor="card.classColor" :date="card.date" :topic="card.topic">{{
                card.title
            }}</TaskCard>
        </div>
    </div>
    <div class="main__column">
        <div class="column__title">
            <p>В работе</p>
        </div>
        <div class="cards" v-for="card in cardsInWork" :key="card.id">
            <TaskCard :classColor="card.classColor" :date="card.date" :topic="card.topic">{{
                card.title
            }}</TaskCard>
        </div>
    </div>
    <div class="main__column">
        <div class="column__title">
            <p>Тестирование</p>
        </div>
        <div class="cards" v-for="card in cardsTesting" :key="card.id">
            <TaskCard :classColor="card.classColor" :date="card.date" :topic="card.topic">{{
                card.title
            }}</TaskCard>
        </div>
    </div>
    <div class="main__column">
        <div class="column__title">
            <p>Готово</p>
        </div>
        <div class="cards" v-for="card in cardsDone" :key="card.id">
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

@media screen and (max-width: 1200px) {
    .main__column {
        width: 100%;
        margin: 0 auto;
        display: block;
    }
}
</style>
