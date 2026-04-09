<script setup>
import PreLoader from '@/components/PreLoader.vue'
import VCalendar from '@/components/VCalendar.vue'
import { inject, ref, watch, provide, onBeforeMount } from 'vue'
import { createTask } from '@/services/api.js'
import { useRouter } from 'vue-router'

const dateOptions = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
}

const router = useRouter()

const addTaskCategory = inject('addTaskCategory')
const isDark = inject('theme')
const { userInfo } = inject('auth')

const loading = ref(false)

const categories = [
    {
        id: 1,
        categoryClassColor: '_orange',
        text: 'Web Design',
    },
    {
        id: 2,
        categoryClassColor: '_green',
        text: 'Research',
    },
    {
        id: 3,
        categoryClassColor: '_purple',
        text: 'Copywriting',
    },
]

// Функция, меняющая поля для отрисовки категорий задач в зависимости от темы
function changeClassColor(categories, isDarkTheme) {
    console.log('changeClassColor: isDarkTheme =', isDarkTheme)

    categories.forEach((item) => {
        switch (item.text) {
            case 'Web Design':
                item.categoryClassColor = isDarkTheme ? '_orange-dark' : '_orange'
                break
            case 'Research':
                item.categoryClassColor = isDarkTheme ? '_green-dark' : '_green'
                break
            case 'Copywriting':
                item.categoryClassColor = isDarkTheme ? '_purple-dark' : '_purple'
                break
            default:
                break
        }
    })
}
const { tasks, arrsOfStatuses, cardsStatus, updateTasks, tasksDistributionByColumns } =
    inject('tasksData')

const newTask = ref({
    title: '',
    description: '',
    topic: '',
    status: 'Без статуса',
    date: null,
})
console.log('TaskCreating: newTask.value.date =', newTask.value.date)

const newTaskErrors = ref({
    title: '',
    description: '',
    topic: '',
    status: '',
    date: null,
})

const taskError = ref('')

const categoryItemText = ref('')

const selectedDate = ref(null)
watch(selectedDate, () => {
    newTask.value.date = selectedDate.value
    console.log('!!!!!TaskCreating: selectedDate =', selectedDate.value)
    console.log('!!!!!TaskCreating: newTask.value.date =', newTask.value.date)
})

async function createNewTask(event) {
    event.preventDefault()
    // Валидация формы перед отправкой
    if (!validateNewTask()) {
        return
    }
    try {
        loading.value = true
        userInfo.value = JSON.parse(localStorage.getItem('userInfo'))
        const token = userInfo.value.token

        const data = await createTask(
            {
                token: token,
            },

            {
                title: newTask.value.title,
                topic: newTask.value.topic,
                description: newTask.value.description,
                status: newTask.value.status,
                date: newTask.value.date.toISOString(),
            },
        )
        if (data) {
            addTaskCategory(data.tasks, isDark.value)
            // console.log('!!!!!!!!! TC до апдейта: tasks.value =', tasks.value)
            updateTasks(data.tasks)
            // console.log('!!!!!!!!! TC после апдейта: tasks.value =', tasks.value)
            arrsOfStatuses.value = tasksDistributionByColumns(cardsStatus, tasks.value)
            router.push('/')
        }
    } catch (err) {
        taskError.value = err
        alert(taskError.value)
    } finally {
        loading.value = false
    }
}

function validateNewTask() {
    console.log('newTask.value.date =', newTask.value.date)

    let isValid = true
    taskError.value = ''
    // Сбросим все ошибки
    newTaskErrors.value.title = false
    newTaskErrors.value.description = false
    newTaskErrors.value.topic = false
    newTaskErrors.value.date = false
    // Проверка категории задачи
    if (!newTask.value.topic.trim()) {
        newTaskErrors.value.topic = true
        taskError.value = 'Пожалуйста, выберите категорию'
        isValid = false
    }
    // Проверка описания
    if (!newTask.value.description.trim()) {
        newTaskErrors.value.description = true
        taskError.value = 'Пожалуйста, введите описание задачи'
        isValid = false
    }
    // Проверка имени задачи
    if (!newTask.value.title.trim()) {
        newTaskErrors.value.title = true
        taskError.value = 'Пожалуйста, введите название задачи'
        isValid = false
    }
    // Проверка даты выполнения задачи
    if (!newTask.value.date) {
        newTaskErrors.value.date = true
        taskError.value = 'Пожалуйста, выберите дату выполнения задачи'
        isValid = false
    }

    return isValid
}

function getDeadlineDate(date) {
    selectedDate.value = date
}

function showDate() {
    if (!(newTask.value.date === null)) {
        return newTask.value.date.toLocaleString('ru-RU', dateOptions)
    }
    return
}

function showString() {
    if (!(newTask.value.date === null)) {
        return 'Срок исполнения:'
    }
    return 'Выберите срок исполнения'
}
onBeforeMount(() => {
    console.log('onBeforeMount')
    changeClassColor(categories, isDark.value)
})
provide('taskDate', null)
provide('edit?', true)
</script>

<template>
    <PreLoader v-if="loading" />
    <div v-else class="pop-new-card" id="popNewCard">
        <div class="pop-new-card__container">
            <div class="pop-new-card__block">
                <div class="pop-new-card__content">
                    <h3 class="pop-new-card__ttl">Создание задачи</h3>
                    <div v-if="taskError" class="modal__form-error">
                        <p>{{ taskError }}</p>
                    </div>
                    <RouterLink to="/" class="pop-new-card__close">&#10006;</RouterLink>
                    <div class="pop-new-card__wrap">
                        <form class="pop-new-card__form form-new" id="formNewCard" action="#">
                            <div class="form-new__block">
                                <label for="formTitle" class="subttl">Название задачи</label>
                                <input
                                    class="form-new__input"
                                    type="text"
                                    name="name"
                                    id="formTitle"
                                    placeholder="Введите название задачи..."
                                    v-model="newTask.title"
                                    autofocus
                                />
                            </div>
                            <div class="form-new__block">
                                <label for="textArea" class="subttl">Описание задачи</label>
                                <textarea
                                    class="form-new__area"
                                    name="text"
                                    id="textArea"
                                    placeholder="Введите описание задачи..."
                                    v-model="newTask.description"
                                ></textarea>
                            </div>
                        </form>

                        <div class="pop-new-card__calendar calendar">
                            <VCalendar @pick-date="getDeadlineDate" />
                            <div class="calendar__period">
                                <p class="calendar__p date-end">
                                    {{ showString() }}
                                    <span class="date-control">{{ showDate() }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="pop-new-card__categories categories">
                        <p class="categories__p subttl">Категория</p>
                        <div class="categories__themes">
                            <div
                                v-for="(category, index) in categories"
                                :key="index"
                                class="categories__theme"
                                :class="[
                                    category.categoryClassColor,
                                    { '_active-category': category.text == categoryItemText },
                                ]"
                                @click="
                                    ((categoryItemText = category.text),
                                    (newTask.topic = category.text))
                                "
                            >
                                <p :class="category.categoryClassColor">{{ category.text }}</p>
                            </div>
                        </div>
                    </div>
                    <button class="form-new__create _hover01" id="btnCreate" @click="createNewTask">
                        Создать задачу
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal__input {
    width: 100%;
    min-width: 100%;
    border-radius: 8px;
    border: 0.7px solid rgba(148, 166, 190, 0.4);
    outline: none;
    padding: 10px 8px;
}
.modal__input::-moz-placeholder {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.28px;
    color: #94a6be;
}
.modal__input::placeholder {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.28px;
    color: #94a6be;
}

.calendar__wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.local-wrapper {
    margin-top: 80px;
}

select {
    width: 100%;
    max-width: 300px;
}
.modal__form-error p {
    text-align: start;
    margin-bottom: 19px;
    color: rgb(248, 4, 4);
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.14px;
}
.pop-new-card {
    width: 100%;
    min-width: 375px;
    height: 100%;
    min-height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 6;
}

.pop-new-card:target {
    display: block;
}

.pop-new-card__container {
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
.pop-new-card__block {
    display: block;
    margin: 0 auto;
    background-color: #ffffff;
    max-width: 630px;
    width: 100%;
    padding: 40px 30px 48px;
    border-radius: 10px;
    border: 0.7px solid #d4dbe5;
    position: relative;
}
.pop-new-card__content {
    display: block;
    text-align: left;
}
.pop-new-card__ttl {
    color: #000;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 20px;
}
.pop-new-card__close {
    position: absolute;
    top: 20px;
    right: 30px;
    color: #94a6be;
    cursor: pointer;
}
.pop-new-card__close:hover {
    color: #000000;
}
.pop-new-card__wrap {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}
.pop-new-card__form {
    max-width: 370px;
    width: 100%;
    display: block;
    margin-bottom: 20px;
}

.form-new__block {
    display: flex;
    flex-direction: column;
}
.form-new__input,
.form-new__area {
    width: 100%;
    outline: none;
    padding: 14px;
    background: transparent;
    border: 0.7px solid rgba(148, 166, 190, 0.4);
    border-radius: 8px;
    font-size: 14px;
    line-height: 1;
    letter-spacing: -0.14px;
}
.form-new__input::-moz-placeholder,
.form-new__area::-moz-placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: #94a6be;
    letter-spacing: -0.14px;
}
.form-new__input::placeholder,
.form-new__area::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: #94a6be;
    letter-spacing: -0.14px;
}
.form-new__input {
    margin: 20px 0;
}
.form-new__area {
    max-width: 370px;
    margin-top: 14px;
    height: 200px;
}
.form-new__create {
    width: 132px;
    height: 30px;
    background-color: #565eef;
    border-radius: 4px;
    border: 0;
    outline: none;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    color: #ffffff;
    float: right;
}

._purple {
    background-color: #e9d4ff;
    color: #9a48f1;
}

._purple-dark {
    background-color: #9a48f1;
    color: #e9d4ff;
}

._green {
    background-color: #b4fdd1;
    color: #06b16e;
}

._green-dark {
    background-color: #06b16e;
    color: #b4fdd1;
}

._orange {
    background-color: #ffe4c2;
    color: #ff6d00;
}

._orange-dark {
    background-color: #ff6d00;
    color: #ffe4c2;
}

._hover01:hover {
    background-color: #33399b;
}

._active-category {
    opacity: 1 !important;
}

.categories {
    margin-bottom: 20px;
}

.categories__themes {
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: flex-start;
}

.categories__p {
    margin-bottom: 14px;
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

.categories__theme:hover {
    cursor: pointer;
}

.categories__theme p {
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    white-space: nowrap;
}

.subttl {
    color: #000;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
}

.calendar {
    width: 182px;
    margin-bottom: 20px;
}
.calendar__ttl {
    margin-bottom: 10px;
    padding: 0 7px;
}

.calendar__p {
    color: #94a6be;
    font-size: 12px;
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

.calendar__p {
    color: #94a6be;
    font-size: 12px;
    line-height: 1;
}

.calendar__p span {
    color: #000000;
}

.calendar__period {
    margin-top: 10px;
    padding: 0 7px;
}

._current {
    font-weight: 700;
}

._other-month {
    opacity: 0;
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
    .pop-new-card {
        top: 70px;
    }
    .pop-new-card__container {
        padding: 0;
        justify-content: flex-start;
    }
    .pop-new-card__block {
        border-radius: 0;
    }
    .pop-new-card__wrap {
        display: block;
        align-items: center;
    }
}

@media screen and (max-width: 495px) {
    .pop-new-card__calendar {
        width: 100%;
    }
}

@media screen and (max-width: 495px) {
    .form-new__area {
        max-width: 100%;
        height: 34px;
    }
    .form-new__create {
        width: 100%;
        height: 40px;
    }
    .pop-new-card__block {
        padding: 20px 16px 32px;
    }
    .pop-new-card__form {
        max-width: 100%;
        width: 100%;
        display: block;
    }
}
</style>
