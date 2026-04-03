<script setup>
import { inject } from 'vue'
import TaskCard from './TaskCard.vue'

const { arrsOfStatuses, cardsStatus } = inject('tasksData')
console.log('TaskColumn: arrsOfStatuses.value = ', arrsOfStatuses.value)
</script>

<template>
    <div class="main__column" v-for="(column, index) in cardsStatus" :key="index">
        <div class="column__title">
            <p>{{ column }}</p>
        </div>
        <div class="cards">
            <TaskCard
                v-for="card in arrsOfStatuses[index]"
                :id="card._id"
                :classColor="card.classColor"
                :date="card.date"
                :topic="card.topic"
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
