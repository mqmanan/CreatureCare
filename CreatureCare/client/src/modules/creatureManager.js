import { getToken } from "./authManager";
const baseUrl = '/api/Creature';

export const getAllCreatures = () => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    "An unknown error appeared!"
                );
            }
        });
    });
};

export const addCreature = (category) => {
    return getToken().then((token) => {
        return fetch(baseUrl), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`

            },
            body: JSON.stringify(category),
        }
    });
};