<script setup>
// Опции для преобразования дат в задачах
const dateOptions = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
}
import VCalendar from '@/components/VCalendar.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const id = computed(() => route.params.id)

import { computed, ref, inject, provide } from 'vue'
import PreLoader from '@/components/PreLoader.vue'

const loading = ref(false)

const { tasks } = inject('tasksData')
console.log('TaskBrowse: tasks =', tasks)

const taskDeleter = inject('taskDeleter')

const task = computed(() => {
    const seekedTask = tasks.value.find((task) => task._id === id.value) || {
        _id: '0',
        topic: '',
        classColor: '',
        title: 'Задачи не существует',
        date: new Date(),
        status: '',
        description: '',
    }
    return seekedTask
})

provide('taskDate', task.value.date)
provide('edit?', false)
</script>

<template>
    <PreLoader v-if="loading" />
    <div v-else class="pop-browse">
        <div class="pop-browse__container">
            <div class="pop-browse__block">
                <div class="pop-browse__content">
                    <div class="pop-browse__top-block">
                        <h3 class="pop-browse__ttl">{{ task.title }}</h3>
                        <div
                            :class="[
                                'categories__theme',
                                'theme-top',
                                '_active-category',
                                task.classColor,
                            ]"
                        >
                            <p :class="task.classColor">{{ task.topic }}</p>
                        </div>
                    </div>
                    <div class="pop-browse__status status">
                        <p class="status__p subttl">Статус</p>
                        <div class="status__themes">
                            <div class="status__theme _gray">
                                <p class="_gray">{{ task.status }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="pop-browse__wrap">
                        <form class="pop-browse__form form-browse" id="formBrowseCard" action="#">
                            <div class="form-browse__block">
                                <label for="textArea01" class="subttl">Описание задачи</label>
                                <textarea
                                    class="form-browse__area"
                                    name="text"
                                    id="textArea01"
                                    readonly
                                    placeholder="Введите описание задачи..."
                                    v-model="task.description"
                                ></textarea>
                            </div>
                        </form>
                        <div class="pop-new-card__calendar calendar">
                            <VCalendar />
                            <div class="calendar__period">
                                <p class="calendar__p date-end">
                                    Срок исполнения:
                                    <span class="date-control">{{
                                        task.date.toLocaleString('ru-RU', dateOptions)
                                    }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="theme-down__categories theme-down">
                        <p class="categories__p subttl">Категория</p>
                        <div class="categories__theme _orange _active-category">
                            <p class="_orange">Web Design</p>
                        </div>
                    </div>
                    <div class="pop-browse__btn-browse">
                        <div class="btn-group">
                            <button class="btn-browse__edit _btn-bor _hover03">
                                <RouterLink :to="{ name: 'edit-card', params: { id } }"
                                    >Редактировать задачу
                                </RouterLink>
                            </button>
                            <button class="btn-browse__delete _btn-bor _hover03">
                                <a href="#" @click="taskDeleter">Удалить задачу</a>
                            </button>
                        </div>
                        <button class="btn-browse__close _btn-bg _hover01">
                            <RouterLink to="/">Закрыть</RouterLink>
                        </button>
                    </div>
                    <div class="pop-browse__btn-edit _hide">
                        <div class="btn-group">
                            <button class="btn-edit__edit _btn-bg _hover01">
                                <a href="#">Сохранить</a>
                            </button>
                            <button class="btn-edit__edit _btn-bor _hover03">
                                <a href="#">Отменить</a>
                            </button>
                            <button class="btn-edit__delete _btn-bor _hover03" id="btnDelete">
                                <a href="#">Удалить задачу</a>
                            </button>
                        </div>
                        <button class="btn-edit__close _btn-bg _hover01">
                            <a href="#">Закрыть</a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pop-browse {
    width: 100%;
    height: 100%;
    min-width: 375px;
    min-height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 7;
}
.pop-browse__container {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
}
.pop-browse__block {
    display: block;
    margin: 0 auto;
    background-color: #ffffff;
    max-width: 630px;
    width: 100%;
    padding: 40px 30px 38px;
    border-radius: 10px;
    border: 0.7px solid #d4dbe5;
    position: relative;
}
.pop-browse__content {
    display: block;
    text-align: left;
}

.pop-browse__content .categories__theme {
    opacity: 1;
}

.categories__theme {
    display: inline-block;
    width: auto;
    height: 30px;
    padding: 8px 20px;
    border-radius: 24px;
    margin-right: 7px;
    opacity: 0.4;
}
.categories__theme p {
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    white-space: nowrap;
}

.categories__p {
    margin-bottom: 14px;
}

.pop-browse__content .theme-down {
    display: none;
    margin-bottom: 20px;
}
.pop-browse__content .theme-top {
    display: block;
}
.pop-browse__top-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
}
.pop-browse__ttl {
    color: #000;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
}
.pop-browse__wrap {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}
.pop-browse__form {
    max-width: 370px;
    width: 100%;
    display: block;
    margin-bottom: 20px;
}
.pop-browse__btn-browse,
.pop-browse__btn-edit {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
}
.pop-browse__btn-browse button,
.pop-browse__btn-edit button {
    height: 30px;
    margin-bottom: 10px;
    padding: 0 14px;
}
.pop-browse__btn-browse .btn-group button,
.pop-browse__btn-edit .btn-group button {
    margin-right: 8px;
}

._purple {
    background-color: #e9d4ff;
    color: #9a48f1;
}

._green {
    background-color: #b4fdd1;
    color: #06b16e;
}

._orange {
    background-color: #ffe4c2;
    color: #ff6d00;
}

.status {
    margin-bottom: 11px;
}

.status__theme {
    border-radius: 24px;
    border: 0.7px solid rgba(148, 166, 190, 0.4);
    color: #94a6be;
    padding: 11px 14px 10px;
    margin-right: 7px;
    margin-bottom: 7px;
}
.status__theme p {
    font-size: 14px;
    line-height: 1;
    letter-spacing: -0.14px;
}

.status__themes {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
}

.status__p {
    margin-bottom: 14px;
}

._active-category {
    opacity: 1 !important;
}

.subttl {
    color: #000;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
}

._hide {
    display: none;
}

._gray {
    background: #94a6be;
    color: #ffffff;
}

.form-browse__block {
    display: flex;
    flex-direction: column;
}
.form-browse__area {
    max-width: 370px;
    width: 100%;
    outline: none;
    padding: 14px;
    background: #eaeef6;
    border: 0.7px solid rgba(148, 166, 190, 0.4);
    border-radius: 8px;
    font-size: 14px;
    line-height: 1;
    letter-spacing: -0.14px;
    margin-top: 14px;
    height: 200px;
}
.form-browse__area::-moz-placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: #94a6be;
    letter-spacing: -0.14px;
}
.form-browse__area::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: #94a6be;
    letter-spacing: -0.14px;
}

.calendar {
    width: 182px;
    margin-bottom: 20px;
}
.calendar__ttl {
    margin-bottom: 14px;
    padding: 0 7px;
}

.calendar__p {
    color: #94a6be;
    font-size: 10px;
    line-height: 1;
}
.calendar__p span {
    color: #000000;
}
.calendar__block {
    display: block;
}
.calendar__month {
    color: #94a6be;
    font-size: 14px;
    line-height: 25px;
    font-weight: 600;
}
.calendar__content {
    margin-bottom: 12px;
}
.calendar__days-names {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    margin: 7px 0;
    padding: 0 7px;
}
.calendar__day-name {
    color: #94a6be;
    font-size: 10px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.2px;
}
.calendar__cells {
    width: 182px;
    height: 126px;
    display: flex;
    flex-wrap: wrap;
}
.calendar__cell {
    width: 22px;
    height: 22px;
    margin: 2px;
    border-radius: 50%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    color: #94a6be;
    font-size: 10px;
    line-height: 1;
    letter-spacing: -0.2px;
    cursor: pointer;
}
.calendar__nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 14px;
    padding: 0 7px;
}

.calendar__period {
    padding: 0 7px;
}

.nav__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.nav__action {
    width: 18px;
    height: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}
.nav__action svg {
    fill: #94a6be;
}

._other-month {
    opacity: 0;
}

._cell-day:hover {
    color: #94a6be;
    background-color: #eaeef6;
}

._current {
    font-weight: 700;
}

._active-day {
    background-color: #94a6be;
    color: #ffffff;
}

._btn-bg {
    border-radius: 4px;
    background: #565eef;
    border: none;
    outline: none;
    color: #ffffff;
}

._btn-bg a {
    color: #ffffff;
}

._btn-bor {
    border-radius: 4px;
    border: 0.7px solid var(--palette-navy-60, #565eef);
    outline: none;
    background: transparent;
    color: #565eef;
}

._btn-bor a {
    color: #565eef;
}

._hover01:hover {
    background-color: #33399b;
}

._hover03:hover {
    background-color: #33399b;
    color: #ffffff;
}
._hover03:hover a {
    color: #ffffff;
}

@media screen and (max-width: 660px) {
    .calendar {
        max-width: 340px;
        width: 100%;
    }
    .calendar__ttl,
    .calendar__nav,
    .calendar__period {
        padding: 0;
    }
    .calendar .date-create {
        display: none;
        margin-bottom: 7px;
    }
    .calendar__p {
        font-size: 14px;
    }
    .calendar__day-name {
        font-size: 14px;
    }
    .calendar__cells {
        width: 344px;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .calendar__cell {
        width: 42px;
        height: 42px;
        font-size: 14px;
    }
}

@media screen and (max-width: 660px) {
    .pop-browse {
        top: 70px;
    }
    .pop-browse__container {
        padding: 0;
        justify-content: flex-start;
    }
    .pop-browse__block {
        border-radius: 0;
    }
    .pop-browse__wrap {
        display: block;
    }
}

@media screen and (max-width: 495px) {
    .form-browse__area {
        max-width: 100%;
    }
    .form-browse__area {
        height: 37px;
    }
    .pop-browse__block {
        padding: 20px 16px 32px;
    }
    .pop-browse__content .theme-down {
        display: block;
        margin-bottom: 20px;
    }
    .pop-browse__content .theme-top {
        display: none;
    }
    .pop-browse__form {
        max-width: 100%;
    }
    .pop-browse__calendar {
        width: 100%;
    }
    .pop-browse__btn-browse button,
    .pop-browse__btn-edit button {
        width: 100%;
        height: 40px;
    }
    .pop-browse__btn-browse .btn-group,
    .pop-browse__btn-edit .btn-group {
        width: 100%;
    }
    .pop-browse__btn-browse .btn-group button,
    .pop-browse__btn-edit .btn-group button {
        margin-right: 0px;
    }
}

@media screen and (max-width: 495px) {
    .pop-new-card__calendar {
        width: 100%;
    }
}
</style>
