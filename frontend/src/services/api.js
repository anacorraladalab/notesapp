export const getNotes = () => {
    return fetch("/api/notes")
        .then((response) => response.json())
        .then((data) => {
            const cleanData = data.map((item) => {
                return {
                    id: item.id_note,
                    title: item.title,
                    content: item.content,
                    photo: item.photo,
                };
            });

            return cleanData;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const addNote = (data) => {
    return fetch("/api/note", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then(() => {
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const getNote = (id) => {
    return fetch(`/api/note/${id}`)
        .then((response) => response.json())
        .then((data) => {
            const cleanData = data.map((item) => {
                return {
                    id: item.id_note,
                    title: item.title,
                    content: item.content,
                    photo: item.photo,
                };
            });

            // Retornar el objeto que hay dentro del array
            return cleanData[0];
        })
        .catch((error) => console.log(error));
};

export const modifyNote = (data, id) => {
    return fetch(`/api/note/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then(() => {
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const deleteNote = (id) => {
    return fetch(`/api/note/${id}`, {
        method: "PATCH",
    })
        .then((response) => response.json())
        .then(() => {
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};
