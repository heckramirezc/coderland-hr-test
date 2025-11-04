# Prueba Técnica Full-Stack: React Native y API C# con PostgreSQL

**Autor:** Hector Ramírez

Este repositorio contiene dos proyectos que forman una prueba técnica: una aplicación móvil (Frontend) desarrollada en React Native y una API REST (Backend) desarrollada en C# (.NET) con PostgreSQL.

## 🚀 1. Frontend: Aplicación Móvil React Native

Proyecto React Native en TypeScript que implementa navegación, gestión de estado con Redux Toolkit y cobertura de pruebas unitarias.

### 📝 Resumen Funcionalidades

| Sección            | Descripción                                                  | Tecnología Clave           |
| ------------------ | ------------------------------------------------------------ | -------------------------- |
| **Tasks (Tasks)**  | CRUD de Tasks local. Lista de tareas persistentes en Redux. Incluye un modal para agregar tareas (con validación). | Redux Toolkit              |
| **Listado Remoto** | Obtención de datos asíncronos desde `mockapi.io`. Muestra estados de Loading/Error/Data. | Redux Thunk / API Fetching |

### 💻 Stack & Pruebas (Frontend)

- **Stack:** React Native (CLI), TypeScript, React Navigation.
- **Gestión de Estado:** Redux Toolkit.
- **Pruebas (Jest):** Pruebas unitarias y transacciones en pantallas.

### ⚙️ Guía de Ejecución (Frontend - Android)

1. **Instalación:** Instala dependencias (`npm install`).
2. **Ejecución:** Ejecuta la aplicación (`npx react-native run-android`).
3. **Tests:** Ejecuta las pruebas unitarias (`npm test`).

## 💾 2. Backend: API REST C# (PostgreSQL & Docker)

API REST desarrollada en C# (.NET) para la gestión de marcas de automóviles.

### ✅ Implementación

- **Persistencia:** PostgreSQL con Entity Framework Core (EF Core), incluyendo migraciones y Data Seed.
- **Endpoint:** `GET /autos/brands` para obtener el listado de marcas.
- **Pruebas:** Cobertura de pruebas unitarias con XUnit (70% de cobertura requerida).
- **Orquestación:** Configuración de Docker Compose para desplegar simultáneamente la API y la base de datos PostgreSQL.

### ⚙️ Guía de Ejecución (Backend - Docker)

El entorno de la API y la base de datos se orquestan con Docker Compose.

#### **Requisitos Previos**

- Docker Desktop (o Docker Engine) instalado y en ejecución.

#### **Pasos de Ejecución**

1. **Navegar a la Raíz:** Abre tu terminal en el directorio donde se encuentra el `docker-compose.yml`.

2. **Iniciar Servicios:** Ejecuta el comando para construir la imagen y levantar la API junto a PostgreSQL:

   ```
   docker compose up --build
   ```

   > **Nota:** La base de datos se crea y las migraciones se aplican automáticamente al iniciar el servicio de la API.

3. **Verificar API:** La API estará disponible en `http://localhost:8080`.

   - **Swagger UI:** `http://localhost:8080/swagger`
   - **Endpoint de Marcas:** `http://localhost:8080/autos/brands`

#### **Ejecución de Pruebas Unitarias**

Desde la raíz del proyecto (`api.sln`), usa:

```
dotnet test
```

Gracias por revisar.