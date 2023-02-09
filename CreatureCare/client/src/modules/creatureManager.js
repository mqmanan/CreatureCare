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
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An error appeared while loading patient files!",
                );
            }
        });
    });
};

// getting a 404 (the server has not found anything matching the Request-URL) router param not being read000000
// causing errors in CreatureDetails & EditCreature
// can manually go to page now
export const getCreatureById = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    "An error appeared while loading patient file!",
                );
            }
        });
    });
};

export const getCreature = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/edit/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    "An error appeared while loading patient file!",
                );
            }
        });
    });
};

export const addCreature = (creature) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(creature),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    "An error appeared while loading new patient files!"
                );
            }
        });
    });
};

export const updateCreature = (creature) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${creature.id}/edit`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(creature),
        }).then((resp) => {
            if (!resp.ok) {
                throw new Error(
                    "An error occured while loading this patient's file."
                );
            }
        });
    });
};








