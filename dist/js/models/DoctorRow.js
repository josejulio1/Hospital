export class DoctorRow {
    constructor(dni, nombre, apellidos) {
        this.row = document.createElement('tr');
        const dniTd = document.createElement('td');
        const nombreTd = document.createElement('td');
        const apellidosTd = document.createElement('td');

        dniTd.textContent = dni;
        nombreTd.textContent = nombre;
        apellidosTd.textContent = apellidos;

        this.row.appendChild(dniTd);
        this.row.appendChild(nombreTd);
        this.row.appendChild(apellidosTd);
    }

    getRow() {
        return this.row;
    }
}