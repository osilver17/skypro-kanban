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

export async function createTask({ token }, { title, topic, description, status, date }) {
    try {
        const data = await axios.post(API_URL, { title, topic, description, status, date }, {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": "",
            },
        })
        return data.data
        // Возвращаем именно data.data,
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code // that falls out of the range of 2xx  
            console.log('error.response.data.error=', error.response.data.error);
            console.log('error.response.status=', error.response.status);
            throw new Error(error.response.data.error, { cause: error })
        } else if (error.request) {
            // The request was made but no response was received  
            console.log('error.request=', error.request);
            throw new Error(error.request, { cause: error })
        } else {
            // Something happened in setting up the request that triggered an Error  
            console.log('error.message=', error.message);
            throw new Error(error.message, { cause: error })
        }
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
