USE ExpresoFastc5k177_II2026;
GO

INSERT INTO Rol (nombre_rol)
VALUES ('ROLE_ADMIN'), ('ROLE_OPERADOR'), ('ROLE_CONDUCTOR');
GO

--Usuario de prueba
INSERT INTO Usuario (username, password_hash, nombre_completo, email, activo)
VALUES ('admin', 'PEGA_AQUI_TU_HASH_BCRYPT_REAL', 'Administrador Sistema', 'admin@expresofast.cr', 1);

INSERT INTO UsuarioRol (usuario_id, rol_id) VALUES (1, 1);
GO