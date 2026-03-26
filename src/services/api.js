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

// const options = {
//     title: "Новая задача 2!",
//     topic: "Research",
//     status: "Без статуса",
//     description: "Подробное описание задачи",
//     date: "2024-01-07T16:26:18.179Z",
// }

export async function editTask({ token }, options, taskId) {
    try {
        const data = await axios.put(API_URL + '/' + taskId, options, {
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

export async function deleteTask({ token }, taskId) {
    try {
        const data = await axios.delete(API_URL + '/' + taskId, {
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
