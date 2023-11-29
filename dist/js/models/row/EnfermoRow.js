import { Row } from "./Row.js";

/**
 * Crea una fila para la tabla Enfermo
 */
export class EnfermoRow extends Row {
    constructor(dni, nombre, apellidos, dniDoctor, nombreCompania) {
        const row = document.createElement('tr');
        const dniTd = document.createElement('td');
        const nombreTd = document.createElement('td');
        const apellidosTd = document.createElement('td');
        const dniDoctorTd = document.createElement('td');
        const nombreCompaniaTd = document.createElement('td');

        dniTd.textContent = dni;
        nombreTd.textContent = nombre;
        apellidosTd.textContent = apellidos;
        dniDoctorTd.textContent = dniDoctor;
        nombreCompaniaTd.textContent = nombreCompania;

        row.appendChild(dniTd);
        row.appendChild(nombreTd);
        row.appendChild(apellidosTd);
        row.appendChild(dniDoctorTd);
        row.appendChild(nombreCompaniaTd);
        super(row);
    }
}