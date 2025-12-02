import "react";

const Form = ({
    title,
    content,
    photo,
    updateTitle,
    updateContent,
    updatePhoto,
    // Ponemos como valor por defecto false
    isDisabled = false
}) => {
    const handleChangeTitle = (e) => updateTitle(e.target.value);

    const handleChangeContent = (e) => updateContent(e.target.value);

    const handleChangePhoto = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updatePhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <label htmlFor="title">Título</label>
            <input 
                id="title"
                name="title"
                placeholder="Escribe un título"
                value={title}
                onChange={handleChangeTitle}
                disabled={isDisabled}
            />

            <label htmlFor="content">Contenido</label>
            <textarea 
                id="content"
                name="content"
                placeholder="Escribe un contenido"
                value={content}
                onChange={handleChangeContent}
                disabled={isDisabled}
            />

            <label htmlFor="photo">Foto</label>
            <input 
                type="file"
                id="photo"
                name="photo"
                onChange={handleChangePhoto}
                disabled={isDisabled}
            />

            {photo && <img src={photo} />}
        </>
    )
}

export default Form;