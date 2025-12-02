export const getNotes = () => {
    return fetch("http://localhost:3000/api/notes")
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
    return fetch("http://localhost:3000/api/note", {
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
    return fetch(`http://localhost:3000/api/note/${id}`)
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
    return fetch(`http://localhost:3000/api/modify/${id}`, {
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
    return fetch(`http://localhost:3000/api/delete/${id}`, {
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
