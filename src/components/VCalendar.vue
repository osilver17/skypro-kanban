<template>
    <p class="calendar__ttl subttl">Даты</p>
    <div class="calendar__block">
        <div class="calendar__nav">
            <span class="calendar__month">{{ monthNames[currentMonth] }} {{ currentYear }} </span>
            <div class="nav__actions">
                <div class="nav__action" data-action="prev" @click="prevMonth">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="11"
                        viewBox="0 0 6 11"
                    >
                        <path
                            d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z"
                        />
                    </svg>
                </div>
                <div class="nav__action" data-action="next" @click="nextMonth">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="11"
                        viewBox="0 0 6 11"
                    >
                        <path
                            d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z"
                        />
                    </svg>
                </div>
            </div>
        </div>
        <div class="calendar__content">
            <div class="calendar__days-names">
                <div v-for="wday in weekDays" :key="wday" class="calendar__day-name">
                    {{ wday }}
                </div>
            </div>
            <div class="calendar__cells">
                <div
                    class="calendar__cell _cell-day"
                    v-for="(day, idx) in calendarDays"
                    :key="idx"
                    :class="{
                        '_other-month': !day.currentMonth,
                        today: day.isToday,
                        selected: day.isSelected,
                    }"
                    @click="selectDate(day)"
                >
                    {{ day.date.getDate() }}
                </div>
            </div>
        </div>
        <input type="hidden" id="datepick_value" value="08.09.2023" />
        <div class="calendar__period">
            <p class="calendar__p date-end">
                Выберите срок исполнения <span class="date-control"></span>.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VCalendar',
    emits: ['pickDate'],
    data() {
        const today = new Date()
        return {
            currentMonth: today.getMonth(), // Индекс месяца: 0 - январь
            currentYear: today.getFullYear(),
            selectedDate: null, // Хранит выбранную дату
            today: today,
            weekDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            monthNames: [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь',
            ],
        }
    },
    computed: {
        calendarDays() {
            return this.generateCalendar()
        },
    },
    methods: {
        // selectDate(day) {
        //     // ...
        //     this.selectedDate = day.date
        //     this.$emit('pickDate', this.selectedDate)
        // },
        generateCalendar() {
            // 1. Определяем первый и последний день месяца
            const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1)
            const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0)
            // 2. Определяем день недели для первого дня месяца: 0 - воскресенье
            let startDay = firstDayOfMonth.getDay()
            // Для недели, где Пн - первый, превращаем 0 в 6, иначе уменьшаем на 1
            startDay = (startDay + 6) % 7

            const days = []

            // 3. Добавляем предыдущие дни (от конца прошлого месяца, если нужно)
            for (let i = 0; i < startDay; i++) {
                const date = new Date(this.currentYear, this.currentMonth, -(startDay - i - 1))
                days.push({
                    date,
                    currentMonth: false,
                    isToday: this.isToday(date),
                    isSelected: this.isSelected(date),
                })
            }

            // 4. Текущий месяц
            for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
                const date = new Date(this.currentYear, this.currentMonth, d)
                days.push({
                    date,
                    currentMonth: true,
                    isToday: this.isToday(date),
                    isSelected: this.isSelected(date),
                })
            }

            // 5. Дополняем до полного количества ячеек (6 строк по 7 дней)
            while (days.length % 7 !== 0) {
                const date = new Date(
                    this.currentYear,
                    this.currentMonth + 1,
                    days.length - lastDayOfMonth.getDate() - startDay + 1,
                )
                days.push({
                    date,
                    currentMonth: false,
                    isToday: this.isToday(date),
                    isSelected: this.isSelected(date),
                })
            }

            return days
        },
        isToday(date) {
            // Проверяет, совпадает ли дата с сегодняшней
            return (
                date.getDate() === this.today.getDate() &&
                date.getMonth() === this.today.getMonth() &&
                date.getFullYear() === this.today.getFullYear()
            )
        },
        isSelected(date) {
            if (!this.selectedDate || this.selectedDate < this.today) {
                this.selectedDate = null
                // console.log('this.selectedDate =', this.selectedDate)
                return false
            } else {
                // console.log('this.selectedDate =', this.selectedDate)
            }

            return (
                date.getDate() === this.selectedDate.getDate() &&
                date.getMonth() === this.selectedDate.getMonth() &&
                date.getFullYear() === this.selectedDate.getFullYear()
            )
        },
        prevMonth() {
            // Переход на предыдущий месяц
            if (this.currentMonth === 0) {
                this.currentMonth = 11
                this.currentYear -= 1
            } else {
                this.currentMonth -= 1
            }
        },
        nextMonth() {
            // Переход на следующий месяц
            if (this.currentMonth === 11) {
                this.currentMonth = 0
                this.currentYear += 1
            } else {
                this.currentMonth += 1
            }
        },
        selectDate(day) {
            if (!day.currentMonth) {
                // Если пользователь кликнул по дню из прошлого/следующего месяца — перелистываем месяц
                const date = day.date
                this.currentMonth = date.getMonth()
                this.currentYear = date.getFullYear()
            }
            this.selectedDate = day.date
            this.$emit('pickDate', this.selectedDate)
        },
    },
}
</script>

<style scoped>
/* Стили из канбана для календаря */
.subttl {
    color: #000;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
}

.calendar-grid {
    width: 200px;
}
.calendar {
    width: 250px;
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

._cell-day:hover {
    color: #94a6be;
    background-color: #eaeef6;
}

.today {
    background: #31aef7;
    color: #fff;
}

.selected {
    background-color: #94a6be;
    color: #ffffff;
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

.calendar__wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.pop-new-card__calendar {
    width: 100%;
}

@media screen and (max-width: 495px) {
    .pop-new-card__calendar {
        width: 100%;
    }
}
</style>
