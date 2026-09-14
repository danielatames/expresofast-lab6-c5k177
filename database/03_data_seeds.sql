USE ExpresoFastc5k177_II2026;
GO

INSERT INTO Rol (nombre_rol)
VALUES ('ROLE_ADMIN'), ('ROLE_OPERADOR'), ('ROLE_CONDUCTOR');
GO

INSERT INTO Usuario (username, password_hash, nombre_completo, email, activo)
VALUES
    ('admin', '$2a$10$Sv0nhLV/h1A6vPsFcn/Wy.BB5cEZF2orbNxdhCKCs6X0SHhhlvZw.', 'Administrador Sistema', 'admin@expresofast.cr', 1),
    ('operador1', '$2a$10$yd1cLzwgF3hzvI44xT96UOcQcgBlLbd7IA6lurFPM3cqhqOepEHkW', 'Operador de Logistica', 'operador1@expresofast.cr', 1),
    ('conductor1', '$2a$10$MIK10RPZwamq9kMkpxvrmOVDUwWXmhBu2ItKDYcqaJAjRkVbtIqvO', 'Conductor Principal', 'conductor1@expresofast.cr', 1);
GO

INSERT INTO UsuarioRol (usuario_id, rol_id) VALUES
    (1, 1), -- admin
    (2, 2), -- operador1
    (3, 3); -- conductor1 
GO