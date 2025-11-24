CREATE DATABASE IF NOT EXISTS tornet;
USE tornet;

CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nombreCompleto VARCHAR(150) NOT NULL,
    correoElectronico VARCHAR(150) NOT NULL UNIQUE,
    contraseñaCifrada VARCHAR(255) NOT NULL,
    fechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    estadoCuenta ENUM('Activo','Inactivo') DEFAULT 'Activo',
    rol ENUM('Administrador','Organizador','Representante','Jugador') NOT NULL
);

CREATE TABLE Torneo (
    idTorneo INT AUTO_INCREMENT PRIMARY KEY,
    nombreTorneo VARCHAR(150) NOT NULL,
    categoria ENUM('Juvenil','Adulto','Veteranos') NOT NULL,
    sede VARCHAR(150),
    estadoTorneo ENUM('Planificacion','EnCurso','Finalizado') DEFAULT 'Planificacion',
    fechaInicio DATE,
    fechaFin DATE,
    convocatoriaArchivo VARCHAR(255),  -- NUEVO (para CU1)
    idOrganizador INT NOT NULL,
    FOREIGN KEY (idOrganizador) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Equipo (
    idEquipo INT AUTO_INCREMENT PRIMARY KEY,
    nombreEquipo VARCHAR(100) NOT NULL,
    capitanNombre VARCHAR(100),
    idCapitan INT NULL, -- se declara pero sin FOREIGN KEY de momento
    fechaRegistro DATE NOT NULL,
    idRepresentante INT NOT NULL,
    FOREIGN KEY (idRepresentante) REFERENCES Usuario(idUsuario)
);


CREATE TABLE Jugador (
    idJugador INT AUTO_INCREMENT PRIMARY KEY,
    numeroCamiseta INT NOT NULL,
    posicion ENUM('Portero','Defensa','Medio','Delantero') NOT NULL,
    idUsuario INT NULL,
    idEquipo INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (idEquipo) REFERENCES Equipo(idEquipo)
);

CREATE TABLE Partido (
    idPartido INT AUTO_INCREMENT PRIMARY KEY,
    fechaHora DATETIME NOT NULL,
    sedePartido VARCHAR(150),
    resultadoLocal INT DEFAULT 0,
    resultadoVisitante INT DEFAULT 0,
    estadoPartido ENUM('Programado','EnJuego','Finalizado') DEFAULT 'Programado',
    idEquipoLocal INT NOT NULL,
    idEquipoVisitante INT NOT NULL,
    idTorneo INT NOT NULL,
    FOREIGN KEY (idEquipoLocal) REFERENCES Equipo(idEquipo),
    FOREIGN KEY (idEquipoVisitante) REFERENCES Equipo(idEquipo),
    FOREIGN KEY (idTorneo) REFERENCES Torneo(idTorneo)
);

CREATE TABLE Participacion (
    idParticipacion INT AUTO_INCREMENT PRIMARY KEY,
    idJugador INT NOT NULL,
    idPartido INT NOT NULL,
    minutosJugados SMALLINT UNSIGNED DEFAULT 0,
    goles INT DEFAULT 0,
    tarjetasAmarillas TINYINT DEFAULT 0,
    tarjetasRojas TINYINT DEFAULT 0,
    faltas INT DEFAULT 0,
    FOREIGN KEY (idJugador) REFERENCES Jugador(idJugador),
    FOREIGN KEY (idPartido) REFERENCES Partido(idPartido)
);

CREATE TABLE Notificacion (
    idNotificacion INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    tipoNotificacion ENUM('Recordatorio','Resultado','Convocatoria'),
    mensaje VARCHAR(300),
    leida BOOLEAN DEFAULT FALSE,
    fechaEnvio DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario) ON DELETE CASCADE
);

ALTER TABLE Equipo
ADD CONSTRAINT fk_equipo_capitan
FOREIGN KEY (idCapitan) REFERENCES Jugador(idJugador);

ALTER TABLE Usuario DROP COLUMN `contraseñaCifrada`;
ALTER TABLE Usuario MODIFY contrasenaCifrada VARCHAR(255) NULL;



INSERT INTO Usuario (nombreCompleto, correoElectronico, contrasenaCifrada, rol)
VALUES ('Organizador Demo', 'demo@demo.com', '12345', 'Organizador');

ALTER TABLE Torneo MODIFY categoria ENUM('Infantil', 'Juvenil', 'Libre', 'Adulto', 'Veteranos', 'Femenil') NOT NULL;

INSERT INTO Torneo (nombreTorneo, categoria, sede, fechaInicio, fechaFin, idOrganizador, convocatoriaArchivo)
VALUES ('Torneo Prueba', 'Femenil', 'Sede Prueba', '2025-11-28', '2025-11-30', 1, 'convocatoria-1764011825408-553183537.png');
