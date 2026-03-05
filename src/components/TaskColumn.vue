<script setup>
import TaskCardCopy from './TaskCardCopy.vue'
import TaskCardResearch from './TaskCardResearch.vue'
import TaskCardWeb from './TaskCardWeb.vue'

// import HomeView from '@/views/HomeView.vue'
</script>

<template>
    <div class="main__column column">
        <div class="column__title">
            <p>Без статуса</p>
        </div>
        <div class="cards">
            <TaskCardWeb />

            <TaskCardResearch />

            <TaskCardWeb />

            <TaskCardCopy />

            <TaskCardWeb />
        </div>
    </div>
    <div class="main__column">
        <div class="column__title">
            <p>Нужно сделать</p>
        </div>
        <div class="cards">
            <TaskCardResearch />
        </div>
    </div>
    <div class="main__column">
        <div class="column__title">
            <p>В работе</p>
        </div>
        <div class="cards">
            <TaskCardResearch />

            <TaskCardCopy />

            <TaskCardWeb />
        </div>
    </div>
    <div class="main__column">
        <div class="column__title">
            <p>Тестирование</p>
        </div>
        <div class="cards">
            <TaskCardResearch />
        </div>
    </div>
    <div class="main__column">
        <div class="column__title">
            <p>Готово</p>
        </div>
        <div class="cards">
            <TaskCardResearch />
        </div>
    </div>
</template>

<style scoped></style>
