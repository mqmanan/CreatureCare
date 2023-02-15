import { getToken } from "./authManager";
const baseUrl = '/api/Appointment';

export const getAllAppointments = () => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An error appeared while loading appointments!");
            }
        });
    });
};

export const addAppointment = (appointment) => {
    return getToken().then((token) => {
        return fetch(baseUrl, { //update URL
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(appointment),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    "An error appeared while loading the appointment!"
                );
            }
        });
    });
};

export const searchAllAppointments = (queryStr, descBool) => {
    return getToken().then(token => {
        fetch(`${baseUrl}/search?sortDesc=${descBool}&q=${(queryStr ?? "%%")}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
    })
}