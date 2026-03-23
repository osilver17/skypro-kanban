<script setup>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { signUp } from '@/services/authAPI'

const { setUser } = inject('auth')

const router = useRouter()

const formData = ref({
    name: '',
    login: '',
    password: '',
})

const errors = ref({
    name: false,
    login: false,
    password: false,
})
const error = ref('')

function validateForm() {
    let isValid = true
    error.value = ''
    // Сбросим все ошибки
    errors.value.name = false
    errors.value.login = false
    errors.value.password = false
    // Проверка имени
    if (!formData.value.name.trim()) {
        errors.value.name = true
        isValid = false
    }
    // Проверка логина (эл. почты)
    if (!formData.value.login.trim()) {
        errors.value.login = true
        isValid = false
    }
    // Проверка пароля
    if (!formData.value.password.trim()) {
        errors.value.password = true
        isValid = false
    }
    // Если есть ошибки, установим общее сообщение
    if (!isValid) {
        error.value = 'Пожалуйста, заполните все обязательные поля'
    }
    return isValid
}

async function handleSignUp(event) {
    event.preventDefault()
    // Валидация формы перед отправкой
    if (!validateForm()) {
        console.log('error сразу после проверки валидации =', error)
        console.log('error.value сразу после проверки валидации =', error.value)
        return
    }
    try {
        const data = await signUp(formData.value)
        if (data) {
            console.log('data in signUp =', data)
            setUser(data)
            router.push('/')
        }
    } catch (err) {
        error.value = err.message
        console.log('error.value в catch =', error.value)
    }
}
</script>

<template>
    <div class="wrapper">
        <div class="container-signup">
            <div class="modal">
                <div class="modal__block">
                    <div class="modal__ttl">
                        <h2>Регистрация</h2>
                    </div>
                    <form class="modal__form-login" id="formLogUp" action="#">
                        <input
                            class="modal__input first-name"
                            type="text"
                            autocomplete="current-password"
                            name="first-name"
                            id="first-name"
                            placeholder="Имя"
                            v-model="formData.name"
                        />
                        <input
                            class="modal__input login"
                            type="email"
                            autocomplete="email"
                            name="login"
                            id="loginReg"
                            placeholder="Эл. почта"
                            v-model="formData.login"
                        />
                        <input
                            class="modal__input password-first"
                            type="password"
                            autocomplete="new-password"
                            name="password"
                            id="passwordFirst"
                            placeholder="Пароль"
                            v-model="formData.password"
                        />
                        <div v-if="error" class="modal__form-error">
                            <p>{{ error }}</p>
                        </div>
                        <button class="modal__btn-signup-ent _hover01" id="SignUpEnter">
                            <a href="#" @click="handleSignUp">Зарегистрироваться</a>
                        </button>
                        <div class="modal__form-group">
                            <p>
                                Уже есть аккаунт?
                                <RouterLink to="/sign-in">Войдите здесь</RouterLink>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #eaeef6;
}

.container-signup {
    display: block;
    width: 100vw;
    min-height: 100vh;
    margin: 0 auto;
}

._hover01:hover {
    background-color: #33399b;
}

.modal {
    width: 100%;
    height: 100%;
    min-width: 320px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.modal__block {
    display: block;
    margin: 0 auto;
    background-color: #ffffff;
    max-width: 368px;
    width: 100%;
    padding: 50px 60px;
    border-radius: 10px;
    border: 0.7px solid #d4dbe5;
    box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
}
.modal__ttl h2 {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: -0.6px;
    margin-bottom: 20px;
}
.modal__form-login {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.modal__form-login input:not(:last-child) {
    margin-bottom: 7px;
}
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
.modal__btn-signup-ent {
    width: 100%;
    height: 30px;
    background-color: #565eef;
    border-radius: 4px;
    margin-top: 20px;
    margin-bottom: 20px;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 21px;
    font-weight: 500;
    letter-spacing: -0.14px;
    color: #ffffff;
}
.modal__btn-signup-ent a {
    width: 100%;
    height: 100%;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.modal__form-group {
    text-align: center;
}
.modal__form-group p,
.modal__form-group a {
    color: rgba(148, 166, 190, 0.4);
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.14px;
}
.modal__form-group a {
    text-decoration: underline;
}

.modal__form-error p {
    text-align: center;
    margin-top: 12px;
    color: rgb(248, 4, 4);
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.14px;
}

@media screen and (max-width: 375px) {
    .modal {
        background-color: #ffffff;
    }
    .modal__block {
        max-width: 368px;
        width: 100%;
        padding: 0 16px;
        border-radius: none;
        border: none;
        box-shadow: none;
    }
    .modal__btn-signup-ent {
        height: 40px;
    }
}
</style>
