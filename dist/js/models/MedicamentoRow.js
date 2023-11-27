export class MedicamentoRow {
    constructor(nombre, precio, fechaCaducidad) {
        this.row = document.createElement('tr');
        const nombreTd = document.createElement('td');
        const precioTd = document.createElement('td');
        const fechaCaducidadTd = document.createElement('td');

        nombreTd.textContent = nombre;
        precioTd.textContent = precio;
        fechaCaducidadTd.textContent = fechaCaducidad;

        this.row.appendChild(nombreTd);
        this.row.appendChild(precioTd);
        this.row.appendChild(fechaCaducidadTd);
    }

    getRow() {
        return this.row;
    }
}