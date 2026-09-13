USE ExpresoFastc5k177_II2026;
GO

INSERT INTO Rol (nombre_rol)
VALUES ('ROLE_ADMIN'), ('ROLE_OPERADOR'), ('ROLE_CONDUCTOR');
GO


INSERT INTO Usuario (username, password_hash, nombre_completo, email, activo)
VALUES
    ('admin', 'PEGA_AQUI_HASH_DE_admin123', 'Administrador Sistema', 'admin@expresofast.cr', 1),
    ('operador1', 'PEGA_AQUI_HASH_DE_oper123', 'Operador de Logistica', 'operador1@expresofast.cr', 1),
    ('conductor1', 'PEGA_AQUI_HASH_DE_cond123', 'Conductor Principal', 'conductor1@expresofast.cr', 1);
GO

INSERT INTO UsuarioRol (usuario_id, rol_id) VALUES
    (1, 1), -- admin -> ROLE_ADMIN
    (2, 2), -- operador1 -> ROLE_OPERADOR
    (3, 3); -- conductor1 -> ROLE_CONDUCTOR
GO