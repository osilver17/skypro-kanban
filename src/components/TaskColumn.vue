<script setup>
import TaskCard from './TaskCard.vue'
</script>

<template>
    <div class="main__column column">
        <div class="column__title">
            <p>Без статуса</p>
        </div>

        <div>
            <TaskCard classColor="_orange">Web Design</TaskCard>

            <TaskCard classColor="_green">Research</TaskCard>

            <TaskCard classColor="_orange">Web Design</TaskCard>

            <TaskCard classColor="_purple">Copywriting</TaskCard>

            <TaskCard classColor="_orange">Web Design</TaskCard>
        </div>
    </div>
    <div class="main__column">
        <div class="column__title">
            <p>Нужно сделать</p>
        </div>
        <div class="cards">
            <TaskCard classColor="_green">Research</TaskCard>
        </div>
    </div>
    <div class="main__column">
        <div class="column__title">
            <p>В работе</p>
        </div>
        <div class="cards">
            <TaskCard classColor="_green">Research</TaskCard>

            <TaskCard classColor="_purple">Copywriting</TaskCard>

            <TaskCard classColor="_orange">Web Design</TaskCard>
        </div>
    </div>
    <div class="main__column">
        <div class="column__title">
            <p>Тестирование</p>
        </div>
        <div class="cards">
            <TaskCard classColor="_green">Research</TaskCard>
        </div>
    </div>
    <div class="main__column">
        <div class="column__title">
            <p>Готово</p>
        </div>
        <div class="cards">
            <TaskCard classColor="_green">Research</TaskCard>
        </div>
    </div>
</template>

<style scoped></style>
