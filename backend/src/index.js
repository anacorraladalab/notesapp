const express = require("express");
const path = require("path");
const cors = require("cors");
const mysql = require("./database/mysql-pool");
const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

// Configuración para subir límite de respuesta
app.use(express.json({ limit: "25mb" }));
// Para evitar errores de diferente origen cuando se hace la petición
app.use(cors());

// Endpoints

// Pasos para completar el endpoint:
// 1. Poner el método
// 2. Poner la ruta
// 3. Coger de los parámetros los datos que voy a necesitar
// 4. Crear la query
// 5. Crear conexión y pasar la query
// 6. Retornar los datos

// COGER NOTAS
app.get("/api/notes", async (req, res) => {
    try {
        const query = "SELECT * FROM notes WHERE deleted_at IS NULL";

        const connection = await mysql.getConnection();
        const data = await connection.query(query);
        await connection.end();
        res.json(data[0]);
    } catch {
        res.send("Algo ha ido mal");
    }
});

// COGER UNA NOTA ESPECÍFICA
app.get("/api/note/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const query = "SELECT * FROM notes WHERE id_note = ?";

        const connection = await mysql.getConnection();
        const data = await connection.query(query, [id]);
        await connection.end();

        res.json(data[0]);
    } catch {
        res.send("Algo ha ido mal");
    }
});

// CREAR NOTA
app.post("/api/note", async (req, res) => {
    try {
        const { title, content, photo } = req.body;

        const query =
            "INSERT INTO notes (title, content, photo) VALUES (?, ?, ?)";

        const connection = await mysql.getConnection();
        await connection.query(query, [title, content, photo || null]);
        await connection.end();

        res.status(201).send("Nota creada");
    } catch {
        res.send("Algo ha ido mal");
    }
});

// MODIFICAR NOTA
// PUT => Para modificar la mayoría de las columnas
// PATCH => Para modificar una o dos columnas

app.put("/api/note/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // Le pasaremos todos los datos aunque no se hayan modificado todos desde el frontal
        // Si sigue siendo el mismo lo volvemos a poner
        const { title, content, photo } = req.body;

        // IMPORTANTE: Poner el WHERE ya que sino se modifican todos los registros
        const query =
            "UPDATE notes SET title = ?, content = ?, photo = ? WHERE id_note = ?";

        const connection = await mysql.getConnection();
        await connection.query(query, [title, content, photo || null, id]);
        await connection.end();

        res.send("Nota modificada");
    } catch {
        res.send("Algo ha ido mal");
    }
});

// ELIMINAR NOTA

app.patch("/api/note/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const query = "UPDATE notes SET deleted_at = NOW() WHERE id_note = ?";

        const connection = await mysql.getConnection();
        await connection.query(query, [id]);
        await connection.end();

        res.send("Nota eliminada");
    } catch {
        res.send("Algo ha ido mal");
    }
});

// Ruta a los archivos estáticos del build
app.use(express.static(path.join(__dirname, "..", "public")));

// Cualquier ruta del frontend → index.html
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// Configuración para escuchar en el puerto definido
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
