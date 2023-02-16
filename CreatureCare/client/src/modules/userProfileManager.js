import { getToken } from "./authManager";
const _baseUrl = `/api/UserProfile`;

export const getAllUserProfiles = () => {
    return getToken().then((token) => {
        return fetch(`${_baseUrl}/GetAllUsers`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An error occurred while trying to get user profiles."
                );
            }
        });
    });
};

export const getCurrentUserByFirebaseId = (firebaseId) => {
    return getToken().then((token) => {
        return fetch(`${_baseUrl}/${firebaseId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();

                } else {
                    throw new Error(
                        "An unknown error occurred while trying get current user.",
                    );
                }
            })
    })
}

export const getUserWithCreatures = () => {
    return getToken().then((token) => {
        return fetch(`${_baseUrl}/GetUserByIdWithCreatures`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();

                } else {
                    throw new Error(
                        "An error occurred while trying get current user with creatures.",
                    );
                }
            })
    })
}

export const getUserProfileDetails = (id) => {
    return fetch(`${_baseUrl}/GetUserByIdWithUserType/${id}`)
        .then((res) => res.json());
};

export const addUserProfile = (newProfile) => {
    return fetch(`${_baseUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProfile),
    })
        .then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("Error creating new profile!");
            }
        });
};