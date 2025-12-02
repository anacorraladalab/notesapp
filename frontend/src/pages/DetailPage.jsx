import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteNote, getNote, modifyNote } from "../services/api";
import Form from "../components/Form";

const DetailPage = () => {
    const [note, setNote] = useState();
    const [isReadMode, setIsReadMode] = useState(true);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Llamar a la API
        getNote(id).then(data => {
            setNote(data)
        })
    }, [])

    const updateTitle = (value) => {
        setNote({...note, title: value})
    }

    const updateContent = (value) => {
        setNote({...note, content: value})
    }

    const updatePhoto = (value) => {
        setNote({...note, photo: value})
    }

    const handleClickEdit = () => {
        setIsReadMode(false);
    }

    const handleClickSave = () => {
        modifyNote(note, id).then(() => {
            setIsReadMode(true);
        })
    }

    const handleClickDelete = () => {
        deleteNote(id).then(() => {
            navigate("/");
        })
    }

    return (
        <>
            <h1>Detalle de la nota</h1>

            <Form
                title={note?.title}
                content={note?.content}
                photo={note?.photo}
                updateTitle={updateTitle}
                updateContent={updateContent}
                updatePhoto={updatePhoto}
                isDisabled={isReadMode}
            />

            {isReadMode && <button onClick={handleClickEdit}>Editar</button>}
            {!isReadMode && <button onClick={handleClickSave}>Guardar cambios</button>}

            <button onClick={handleClickDelete}>Eliminar</button>
        </>
    )
}

export default DetailPage;