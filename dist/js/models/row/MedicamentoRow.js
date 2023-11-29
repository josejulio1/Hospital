import { Row } from "./Row.js";

/**
 * Crea una fila para la tabla Medicamento
 */
export class MedicamentoRow extends Row {
    constructor(nombre, precio, fechaCaducidad) {
        const row = document.createElement('tr');
        const nombreTd = document.createElement('td');
        const precioTd = document.createElement('td');
        const fechaCaducidadTd = document.createElement('td');

        nombreTd.textContent = nombre;
        precioTd.textContent = precio;
        fechaCaducidadTd.textContent = fechaCaducidad;

        row.appendChild(nombreTd);
        row.appendChild(precioTd);
        row.appendChild(fechaCaducidadTd);
        super(row);
    }
}