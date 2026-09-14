# Laboratorio 6 — ExpresoFast Parte II

**Curso:** IF0009 - Desarrollo de Software IV
**Ciclo:** II-2026
**Laboratorio:** 6 
**Estudiante:** Daniela Tames Vega
**Carné:** c5k177

## Descripción

Segunda parte de la plataforma logística ExpresoFast. Extiende el Laboratorio 5 agregando
seguridad JWT, control de acceso basado en roles (RBAC), capa de DTOs con validación,
manejo centralizado de excepciones y bitácora de auditoría.

## Requisitos de Entorno

- **Java:** 21.0.8 
- **Maven:** incluido como Maven Wrapper (`mvnw` / `mvnw.cmd`), no requiere instalación local
- **SQL Server:** Microsoft SQL Server 2019 (Developer Edition), versión de motor 15.0
- **Navegador:** Microsoft Edge (compatible con cualquier navegador moderno con soporte de Fetch API y ES6+)

## Guía de Configuración de Base de Datos

1. Conectate a tu instancia de SQL Server con SSMS.
2. Creá la base de datos:

   CREATE DATABASE ExpresoFast[TU_CARNET]_II2026;

3. Ejecutá los scripts en este orden exacto:
   - database/01_schema_lab5.sql — crea las tablas del dominio logístico (EmpresaLogistica, Vehiculo, Conductor, Envio)
   - database/02_schema_lab6_extension.sql — crea las tablas de usuarios, roles y bitácora (Usuario, Rol, UsuarioRol, BitacoraEnvio)
   - database/03_data_seeds.sql— inserta los roles base y los usuarios de prueba

### Insertar usuarios con contraseñas encriptadas

Las contraseñas nunca se guardan en texto plano — se almacenan como un hash BCrypt en la columna `password_hash`. Para generar un hash válido:

1. En el backend, ejecutá la clase auxiliar HashGenerator.java (ubicada temporalmente en el paquete raíz durante el desarrollo), que usa BCryptPasswordEncoder para imprimir el hash de una contraseña dada.
2. Copiá el hash impreso en consola.
3. Reemplazá el placeholder correspondiente (`PEGA_AQUI_HASH_DE_...`) en database/03_data_seeds.sql con el hash real.
4. Ejecutá el script actualizado en SSMS.

## Usuarios de Prueba

| Usuario | Contraseña | Rol |
|---|---|---|
| admin | admin123 | ROLE_ADMIN |
| operador1 | oper123 | ROLE_OPERADOR |
| conductor1 | cond123 | ROLE_CONDUCTOR |

## Instrucciones de Ejecución

### Backend

1. Copiá backend/application.properties.template a backend/src/main/resources/application.properties.
2. Completá tus credenciales reales de SQL Server y una clave JWT propia (mínimo 32 caracteres).
3. Desde la carpeta `backend/`, ejecutá: .\mvnw.cmd spring-boot:run
4. El backend queda disponible en `http://localhost:8080`.

### Frontend

1. Abrí frontend/login.html directamente en el navegador (doble clic sobre el archivo).
2. Iniciá sesión con cualquiera de las credenciales de prueba de la tabla anterior.
3. Serás redirigido automáticamente a index.html, el tablero principal, con la interfaz adaptada según tu rol.

## Documentación de la API

La colección de Postman con todos los endpoints está en docs/ExpresoFast_Postman_Collection.json.


