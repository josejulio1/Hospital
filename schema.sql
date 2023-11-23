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
    id_compania INT NOT NULL
);

CREATE TABLE Usuario (
    usuario VARCHAR(30) NOT NULL,
    contrasenia CHAR(60) NOT NULL
);

CREATE TABLE Compania (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Consulta (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    num_sala INT NOT NULL,
    fecha DATE NOT NULL,
    dni_enfermo VARCHAR(9) NOT NULL,
    dni_doctor VARCHAR(9) NOT NULL
);

CREATE TABLE Medicamento (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    precio FLOAT(5,2) NOT NULL,
    fecha_caducidad DATE NOT NULL
);

CREATE TABLE Consulta_Medicamento (
    id_consulta INT NOT NULL,
    id_medicamento INT NOT NULL
);

-- Alter
ALTER TABLE Doctor
ADD CONSTRAINT pk_doctor PRIMARY KEY(dni)
;

ALTER TABLE Enfermo
ADD CONSTRAINT pk_enfermo PRIMARY KEY(dni),
ADD CONSTRAINT fk_enfermo_dniDoctor FOREIGN KEY(dni_doctor) REFERENCES Doctor(dni),
ADD CONSTRAINT fk_enfermo_idCompania FOREIGN KEY(id_compania) REFERENCES Compania(id)
;

ALTER TABLE Consulta
ADD CONSTRAINT fk_consulta_dniEnfermo FOREIGN KEY(dni_enfermo) REFERENCES Enfermo(dni),
ADD CONSTRAINT fk_consulta_dniDoctor FOREIGN KEY(dni_doctor) REFERENCES Doctor(dni)
;

ALTER TABLE Consulta_Medicamento
ADD CONSTRAINT pk_consultaMedicamento PRIMARY KEY(id_consulta, id_medicamento),
ADD CONSTRAINT fk_consultaMedicamento_idConsulta FOREIGN KEY(id_consulta) REFERENCES Consulta(id),
ADD CONSTRAINT fk_consultaMedicamento_idMedicamento FOREIGN KEY(id_medicamento) REFERENCES Medicamento(id)
;

-- Views
CREATE VIEW v_enfermo_nombre_compania AS
SELECT e.dni, e.nombre, e.apellidos, e.dni_doctor, c.nombre AS 'nombre_compania' FROM enfermo e JOIN compania c ON e.id_compania = c.id;