import "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../services/api";
import Form from "../components/Form";

const AddPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [photo, setPhoto] = useState();

    const navigate = useNavigate();

    const updateTitle = (value) => {
        setTitle(value);
    };

    const updateContent = (value) => {
        setContent(value);
    };

    const updatePhoto = (value) => {
        setPhoto(value)
    }

    const handleSubmit = () => {
        // Llamar el Fetch con POST
        addNote({title, content, photo}).then(() => {
            // Navegar al listado
            navigate("/");
        })
    }

    return (
        <>
            <h1>Nueva nota</h1>

            <Form
                title={title}
                content={content}
                photo={photo}
                updateTitle={updateTitle}
                updateContent={updateContent}
                updatePhoto={updatePhoto}
            />

            <button
                onClick={handleSubmit}
                disabled={!title || !content}
            >
                Añadir nota
            </button>
        </>
    )
}

export default AddPage;