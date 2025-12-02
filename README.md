## PASOS PARA DESPLEGAR UN PROYECTO FULL STACK

Vamos a ver los pasos necesarios para desplegar un proyecto full stack, enfocándonos primero en la parte de los archivos estáticos del frontend.
¿Qué son los ficheros estáticos? Son aquellos archivos que no cambian dinámicamente y se sirven tal cual al usuario, como HTML, CSS, JavaScript, imágenes, etc.
¿Cómo los conseguimos? Normalmente, los frameworks modernos de frontend tienen comandos específicos para construir estos archivos optimizados para producción.
¿Os suena? Exacto, es el famoso comando de "build".

Vamos a ver los pasos para desplegar estos archivos estáticos:

1. **Preparar el Proyecto Frontend:**

    - Asegúrate de que tu proyecto frontend (por ejemplo, React, Angular, Vue) esté listo para producción.
    - Ejecuta el comando de construcción (build) para generar los archivos estáticos. Por ejemplo, en React usarías `npm run build`.
    - Esto generará una carpeta `dist` que contiene los archivos HTML, CSS y JavaScript optimizados.

2. **Subir los Archivos Estáticos a un Servidor:**

    - Vamos a copiar esta carpeta `dist` a nuestra carpeta de backend.
    - Pero la vamos a renombrar a `public` para que el servidor pueda servir estos archivos estáticos correctamente.

3. **Configurar el Servidor Backend:**

    - Debemos incorporar la configuración necesaria en nuestro servidor backend para servir los archivos estáticos desde la carpeta `public`.
    - Lo vamos a incorporar en el src/index.js

    ```javascript
    // Módulo nativo de nodeJS
    const path = require("path");
    // Ruta a los archivos estáticos del build
    app.use(express.static(path.join(__dirname, "..", "public")));

    // Cualquier ruta del frontend → index.html
    app.use((req, res) => {
        res.sendFile(path.join(__dirname, "..", "public", "index.html"));
    });
    ```

4. **Probar Localmente:**

    - Antes de desplegar, es importante probar que todo funciona correctamente en tu entorno local.
    - Inicia tu servidor backend y accede a la aplicación desde el navegador para asegurarte de que los archivos estáticos se sirven correctamente.

5. **Crear base de datos en la nube:** - Navegar a https://aiven.io/ - Crear una cuenta - Crear un proyecto de mySql - Seleccionar Europa como región y crear servicio gratuito. - Una vez creado, podremos ver los datos de conexión (host, user, password, database, port). - Descargar el certificado CA. (Necesario posteriormente para conectarnos desde mysql Workbench).

6. **Configurar base de datos en nuestro servidor** - En el archivo .env de nuestro proyecto, añadiremos las variables de entorno necesarias para conectar con la base de datos en la nube. - Ejemplo:
   `   DB_HOST=tu_host
 DB_USER=tu_usuario
 DB_PASSWORD=tu_contraseña
 DB_NAME=tu_base_de_datos
 DB_PORT=tu_puerto` - Editar el fichero mysql-pool.js
   `javascript
 const pool = mysql.createPool({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     port: process.env.DB_PORT,
     ssl: {
     ca: fs.readFileSync(__dirname + "/certs/ca.pem"), // ruta a tu certificado
 },
 });
 `

7. **Configurar base de datos en mysql Workbench** - Abrir mysql Workbench - Crear una nueva conexión con los datos de la base de datos en la nube. - En la pestaña SSL, seleccionar "Require" y cargar en CA File el archivo descargado anteriormente. - Test connection para verificar que todo funciona correctamente.

8. **¿Dónde puedo ver mi base de datos?** - En mysql Workbench, una vez conectados, podremos ver las tablas y datos de nuestra base de datos en la nube. - Vamos a crear la base de datos necesaria dentro de esta conexión. Si, tenemos que crearla otra vez. Podemos exportar la ya existente y volverla a importar en la nueva base de datos.

¡Y eso es todo por ahora! En el próximo paso, veremos cómo desplegar la parte del backend y conectar todo junto.

9. **Publicar el servidor en Render:** - Crear una cuenta en https://render.com/ a través de GitHub. - Crear un nuevo "Web Service" - Conectar el repositorio de GitHub donde tenemos nuestro proyecto. - Decirle que el root sea la carpeta de backend. - Indicar que el start command es `node src/index.js`. - Crear el servicio gratuito. - Añadir las variables de entorno que tenemos en el .env - Desplegar el servicio y esperar a que esté activo.

10. **¿No funciona? Normal, necesitamos estos cambios:** - El puerto en Render deja de ser el 3000, ahora es el que nos proporciona Render a través de la variable de entorno PORT. Por lo tanto, debemos modificar nuestro src/index.js para que escuche en ese puerto:
    `` javascript
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
     `` - Para curarnos en salud de errores, vamos a hacer un pequeño cambio en nuestras apis. En las rutas de nuestros enpoints vamos a añadir /api. Por ejemplo: `app.use('/api/users', usersRouter);`. Así separamos las rutas del backend de las del frontend. - En el frontal del proyecto, debemos modificar las llamadas a la API para que apunten a la URL del servicio que Render nos ha proporcionado. Para ello vamos a creanos dos .env en la carpeta de frontend: - .env.development con REACT_APP_API_URL=http://localhost:3000 - .env.production con REACT_APP_API_URL=https://tu-servicio.onrender.com - Modificaremos las llamadas a la API en el frontend para que usen esta variable de entorno. Por ejemplo:
    `javascript
    fetch('/api/users') // Coge la ruta del .env automáticamente
    ` - Hacer npm build de nuevo, sobreescribir la carpeta public del backend y hacer un commit con todos los cambios.

Recuerda: Cada vez que hagas un commit a la rama main del repositorio que has asociado, Render volverá a desgargar tu código, instalar las dependencias y arrancar tu servidor. Procura no hacer muchos commit a la rama main porque Render tiene un límite de despliegues diarios.
¡Felicidades! Ahora tienes tu proyecto full stack desplegado con los archivos estáticos del frontend y el servidor backend funcionando correctamente.
