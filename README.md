# BBK34_PROYECTO2_social_media

<!-- Bienvenido a **SocialNet**, una API RESTful creada con **Node.js + Express + MongoDB/Mongoose**, que permite gestionar usuarios, publicaciones, likes y comentarios como parte de una red social moderna.

---

## 📑 Tabla de Contenido
- [🛠 Tecnologías](#-tecnologías)
- [🚀 Instalación](#-instalación)
- [📦 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔐 Autenticación y Seguridad](#-autenticación-y-seguridad)
- [📡 Endpoints principales](#-endpoints-principales)
- [🧪 Validaciones y Middleware](#-validaciones-y-middleware)
- [✨ Extras implementados](#-extras-implementados)
- [🚀 Producción](#-producción)
- [📚 Documentación API](#-documentación-api)
- [📄 Licencia](#-licencia)

---

## 🛠 Tecnologías

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT + Bcrypt
- Multer (carga de imágenes)
- Nodemailer (correo de confirmación)
- Dotenv
- Git / GitHub

---

## 🚀 Instalación
```bash
git clone https://github.com/usuario/socialnet.git
cd socialnet
npm install

1 - Autenticación y Seguridad

Registro con Bcrypt
Login con Bcrypt + JWT
Middleware de autenticación (verifyToken)
Middleware de autorización para editar/eliminar solo si eres autor
Validación de email vía token de confirmación (opcional)

2- Endpoints Principales
🔐 Auth
POST /auth/register → Registro de usuario
POST /auth/login → Login y token
GET /auth/me → Info del usuario logueado
GET /auth/logout → Logout

🧑 Usuarios
GET /users/:id → Buscar usuario por ID
GET /users/search?name= → Buscar usuario por nombre
PUT /users/follow/:id → Seguir usuario
PUT /users/unfollow/:id → Dejar de seguir

📝 Posts
POST /posts → Crear post (auth)
GET /posts → Todos los posts (con usuarios y comentarios)
GET /posts/:id → Buscar por ID
GET /posts/search?name= → Buscar por nombre
PUT /posts/:id → Editar (solo autor)
DELETE /posts/:id → Eliminar (solo autor)
PUT /posts/like/:id → Dar like
PUT /posts/unlike/:id → Quitar like

💬 Comentarios
POST /comments/:postId → Crear comentario
PUT /comments/:id → Editar (solo autor)
DELETE /comments/:id → Eliminar (solo autor)
PUT /comments/like/:id → Like a comentario
PUT /comments/unlike/:id → Quitar like a comentario

🧪 Validaciones y Middleware
Validaciones usando express-validator
Middleware de autenticación (authMiddleware)
Middleware de autoría (para posts y comentarios)
Middleware de subida de archivos con multer
Control de errores centralizado

✨ Extras implementados
✅ Subida de imagen en:
Crear/editar post
Crear/editar usuario
Crear/editar comentario

✅ Seguidores:
Seguir / dejar de seguir
Ver número de followers en perfil

✅ Confirmación por correo:
Vía token + link
Si no confirmas, no puedes hacer login

✅ Likes en comentarios

✅ Documentación de endpoints (Postman o Swagger)
 -->


