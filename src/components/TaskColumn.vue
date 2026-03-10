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

<style scoped></style>
