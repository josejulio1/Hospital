import { Row } from "./Row.js";

/**
 * Crea una fila para la tabla Compañía
 */
export class CompaniaRow extends Row {
    constructor(nombre) {
        const row = document.createElement('tr');
        const nombreTd = document.createElement('td');

        nombreTd.textContent = nombre;

        row.appendChild(nombreTd);
        super(row);
    }
}