<script setup>
import TaskColumn from '@/components/TaskColumn.vue'
</script>

<template>
    <div class="container">
        <div class="main__block">
            <div class="main__content">
                <TaskColumn />
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 1260px;
    width: 100%;
    margin: 0 auto;
    padding: 0 30px;
}

.main__block {
    width: 100%;
    margin: 0 auto;
    padding: 25px 0 49px;
}
.main__content {
    width: 100%;
    display: flex;
}

@media screen and (max-width: 1200px) {
    .main__block {
        width: 100%;
        margin: 0 auto;
        padding: 40px 0 64px;
    }
    .main__content {
        display: block;
    }
}

@media screen and (max-width: 495px) {
    .container {
        width: 100%;
        padding: 0 16px;
    }
}
</style>
