# BildyApp API

## Ivan Garcia-Arcicollar Lorenzo

---

API RESTful para la gestión de usuarios y compañías de la aplicación **BildyApp**.

### Tecnologias

- **Node.js 22+** - Runtime con soporte ESM nativo
- **Express 5** - Framework web con manejo async automático
- **MongoDB Atlas** + **Mongoose 8** - Base de datos NoSQL
- **JWT** - Autenticación con access tokens y refresh tokens
- **Zod** - Validación de datos con transformaciones
- **bcryptjs** - Hash seguro de contraseñas
- **express-mongo-sanitize** - Prevención de inyección NoSQL
- **Helmet** - Headers de seguridad HTTP
- **Multer** - Gestión de subida de archivos

---

## Requisitos Previos

- Node.js 22.11.0 o superior
- Cuenta gratuita en [MongoDB Atlas](https://www.mongodb.com/atlas)
- Git

---

## Instalacion

```bash
# 1. Clonar el repositorio
git clone https://github.com/IvanOoff/Practica-Intermedia-BildyApp-Ivan-Garcia-Arcicollar-Lorenzo.git
cd bildyapp-api

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env desde el ejemplo
cp .env.example .env
```

---

## Configuracion

Editar el archivo `.env` con tus datos reales:

```env
NODE_ENV=development
PORT=3000
DB_URI=mongodb+srv://<tu_usuario>:<tu_password>@<tu_cluster>.mongodb.net/bildyapp?retryWrites=true&w=majority
JWT_SECRET=<tu_secret_de_32_caracteres_minimo>
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

**Generar JWT_SECRET seguro:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Ejecucion

```bash
# Desarrollo (con --watch para recargar automáticamente)
npm run dev

# Producción
npm start
```

El servidor estará disponible en: **http://localhost:3000**

---

## Endpoints

### Autenticacion

| Metodo | Ruta | Descripcion | Auth |
|--------|------|-------------|------|
| POST | `/api/user/register` | Registro de usuario | No |
| PUT | `/api/user/validation` | Validar email | Si |
| POST | `/api/user/login` | Iniciar sesion | No |
| POST | `/api/user/refresh` | Renovar access token | No |
| POST | `/api/user/logout` | Cerrar sesion | Si |

### Usuario

| Metodo | Ruta | Descripcion | Auth |
|--------|------|-------------|------|
| GET | `/api/user` | Obtener usuario autenticado | Si |
| PUT | `/api/user/register` | Actualizar perfil | Si |
| PUT | `/api/user/password` | Cambiar contrasena | Si |
| DELETE | `/api/user` | Eliminar cuenta | Si |
| PATCH | `/api/user/company` | Crear/unirse a empresa | Si |
| PATCH | `/api/user/company/join` | Unirse a empresa existente | Si |
| GET | `/api/user/company` | Ver empresa | Si |
| PUT | `/api/user/company` | Actualizar empresa | Si |
| PATCH | `/api/user/logo` | Subir logo de empresa | Si |
| POST | `/api/user/invite` | Invitar usuario a empresa | Si |

---

## Testing

Usar el archivo `requests.http` con la extension **REST Client** en VS Code, o importar en **Postman/Thunder Client**.

### Registro y Login

```bash
# Registro
curl -X POST http://localhost:3000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"TestPass123","name":"Juan","lastName":"Perez"}'

# Login
curl -X POST http://localhost:3000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"TestPass123"}'
```

---

## Estructura del Proyecto

```
bildyapp-api/
├── src/
│   ├── config/
│   │   └── index.js          # Configuración y conexión MongoDB
│   ├── controllers/
│   │   └── user.controller.js # Lógica de negocio
│   ├── middleware/
│   │   ├── auth.middleware.js # Verificación JWT
│   │   ├── error-handler.js   # Manejo global de errores
│   │   ├── role.middleware.js # Autorización por roles
│   │   ├── upload.js          # Configuración Multer
│   │   └── validate.js        # Validación Zod
│   ├── models/
│   │   ├── Company.js         # Modelo de empresa
│   │   ├── RefreshToken.js    # Modelo de refresh tokens
│   │   └── User.js            # Modelo de usuario
│   ├── routes/
│   │   ├── index.js           # Agregador de rutas
│   │   └── user.routes.js     # Rutas de usuario
│   ├── services/
│   │   └── notification.service.js # EventEmitter
│   ├── utils/
│   │   ├── AppError.js        # Clase de errores
│   │   ├── handleJwt.js       # Utilidades JWT
│   │   └── handlePassword.js  # Utilidades bcrypt
│   ├── validators/
│   │   └── user.validator.js   # Schemas Zod
│   ├── app.js                 # Configuración Express
│   └── index.js               # Punto de entrada
├── uploads/                   # Archivos subidos
├── .env                       # Variables de entorno (no subir)
├── .env.example               # Template de variables
├── .gitignore
├── package.json
├── requests.http              # Ejemplos de endpoints
└── README.md
```

---

## Eventos EventEmitter

La API emite eventos para seguimiento:

- `user.registered` - Nuevo usuario registrado
- `user.validated` - Email validado
- `user.deleted` - Usuario eliminado
- `user.invited` - Usuario invitado a empresa

---

## Seguridad

- Passwords hasheados con bcrypt (salt 10)
- Tokens JWT con expiración corta (15min)
- Refresh tokens opacos almacenados en BD
- Prevención de inyección NoSQL con express-mongo-sanitize
- Headers de seguridad con Helmet
- Rate limiting configurado

---

## Autor

**Ivan Garcia-Arcicollar Lorenzo**

---

## Licencia

MIT