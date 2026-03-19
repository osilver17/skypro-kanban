import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/kanban'

export async function fetchTasks({ token }) {
    try {
        const data = await axios.get(API_URL, {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": "",
            },
        })
        return data.data
        // Возвращаем именно data.data,
    } catch (error) {
        throw new Error(error.message, { cause: error })
    }
}

export async function createTask({ token }, { title, description, topic }) {
    try {
        const data = await axios.post(API_URL, { title, description, topic }, {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": "",
            },
        })
        return data.data
        // Возвращаем именно data.data,
    } catch (error) {
        throw new Error(error.message, { cause: error })
    }
}
