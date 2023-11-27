export class EnfermoRow {
    constructor(dni, nombre, apellidos, dniDoctor, nombreCompania) {
        this.row = document.createElement('tr');
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

        this.row.appendChild(dniTd);
        this.row.appendChild(nombreTd);
        this.row.appendChild(apellidosTd);
        this.row.appendChild(dniDoctorTd);
        this.row.appendChild(nombreCompaniaTd);
    }

    getRow() {
        return this.row;
    }
}