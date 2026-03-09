<script setup>
import TaskCard from './TaskCard.vue'
import { cardsNoStatus, cardsNeedToDo, cardsInWork, cardsTesting, cardsDone } from '@/mocks/tasks'
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
