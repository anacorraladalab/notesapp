import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getNotes } from "../services/api";

const HomePage = () => {
    // Estado
    const [notes, setNotes] = useState([]);
    // useEffect

    const navigate = useNavigate();

    useEffect(() => {
        // fetch - api.js
        getNotes().then((data) => {
            // modificar el estado
            setNotes(data);
        })
    }, [])

    // Función manejadora
    // Navegar al formulario - navigate
    const handleClick = () => {
        navigate("/add");
    }

    return (
        <>
            <h1>Mis notas</h1>
            <button onClick={handleClick}>Añadir nota</button>
            <ul>
                {notes.map((note) => {
                    return (
                        <Link key={note.id} to={`/note/${note.id}`}>
                            <li>
                                <h2>{note.title}</h2>
                                <p>{note.content}</p>
                                {note.photo && <img src={note.photo} />}
                            </li>
                        </Link>
                    )
                })}
            </ul>
        </>
    )
}

export default HomePage;