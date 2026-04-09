import axios from 'axios';

const API_URL = "https://wedev-api.sky.pro/api/user";

export async function signUp({ name, login, password }) {
    try {
        const data = await axios.post(
            API_URL,
            { login, name, password },
            {
                headers: {
                    "Content-Type": "",
                },
            }
        );
        return data.data.user;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.error, { cause: error });
    }
}

export async function signIn(userData) {
    try {
        const data = await axios.post(API_URL + "/login", userData, {
            headers: {
                "Content-Type": "",
            },
        });
        console.log('signIn: data =', data);
        return data.data.user;
    } catch (error) {
        console.log(error);
        // console.log(error.response);
        // console.log(error.response.data);
        // console.log(error.response.data.error);
        throw new Error(error.message, { cause: error });
    }
}

