DROP DATABASE IF EXISTS Hospital;

CREATE DATABASE Hospital CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE Hospital;

CREATE TABLE Doctor (
    dni VARCHAR(9) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    apellidos VARCHAR(50) NOT NULL
);

CREATE TABLE Enfermo (
    dni VARCHAR(9) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    dni_doctor VARCHAR(9) NOT NULL,
    nombre_compania VARCHAR(50) NOT NULL
);

CREATE TABLE Usuario (
    usuario VARCHAR(30) NOT NULL,
    contrasenia CHAR(60) NOT NULL
);

CREATE TABLE Compania (
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Consulta (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    dni_enfermo VARCHAR(9) NOT NULL,
    dni_doctor VARCHAR(9) NOT NULL,
    num_sala INT NOT NULL,
    fecha DATE NOT NULL,
    id_medicamento INT
);

CREATE TABLE Medicamento (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    precio FLOAT(5,2) NOT NULL,
    fecha_caducidad DATE NOT NULL
);

/* CREATE TABLE Consulta_Medicamento (
    id_consulta INT NOT NULL,
    id_medicamento INT NOT NULL
); */

-- Alter
ALTER TABLE Compania
ADD CONSTRAINT pk_compania PRIMARY KEY(nombre)
;

ALTER TABLE Doctor
ADD CONSTRAINT pk_doctor PRIMARY KEY(dni)
;

ALTER TABLE Enfermo
ADD CONSTRAINT pk_enfermo PRIMARY KEY(dni),
ADD CONSTRAINT fk_enfermo_dniDoctor FOREIGN KEY(dni_doctor) REFERENCES Doctor(dni),
ADD CONSTRAINT fk_enfermo_idCompania FOREIGN KEY(nombre_compania) REFERENCES Compania(nombre)
;

ALTER TABLE Consulta
ADD CONSTRAINT fk_consulta_dniEnfermo FOREIGN KEY(dni_enfermo) REFERENCES Enfermo(dni),
ADD CONSTRAINT fk_consulta_dniDoctor FOREIGN KEY(dni_doctor) REFERENCES Doctor(dni),
ADD CONSTRAINT fk_consulta_idMedicamento FOREIGN KEY(id_medicamento) REFERENCES Medicamento(id) ON UPDATE CASCADE
;

-- Views
CREATE VIEW v_consulta_medicamento AS
SELECT c.dni_enfermo, c.dni_doctor, c.fecha, c.num_sala, m.nombre AS "nombre_medicamento", m.precio AS "precio_medicamento", m.fecha_caducidad AS "fecha_caducidad_medicamento"
FROM consulta c
LEFT JOIN medicamento m ON c.id_medicamento = m.id;