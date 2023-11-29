import { Row } from "./Row.js";

/**
 * Crea una fila para la tabla Doctor
 */
export class DoctorRow extends Row {
    constructor(dni, nombre, apellidos) {
        const row = document.createElement('tr');
        const dniTd = document.createElement('td');
        const nombreTd = document.createElement('td');
        const apellidosTd = document.createElement('td');

        dniTd.textContent = dni;
        nombreTd.textContent = nombre;
        apellidosTd.textContent = apellidos;

        row.appendChild(dniTd);
        row.appendChild(nombreTd);
        row.appendChild(apellidosTd);
        super(row);
    }
}