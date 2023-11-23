export class EnfermoRow {
    constructor(dni, nombre, apellidos, dniDoctor, nombreCompania) {
        this.row = document.createElement('tr');
        this.dniTd = document.createElement('td');
        this.nombreTd = document.createElement('td');
        this.apellidosTd = document.createElement('td');
        this.dniDoctorTd = document.createElement('td');
        this.nombreCompaniaTd = document.createElement('td');

        this.dniTd.textContent = dni;
        this.nombreTd.textContent = nombre;
        this.apellidosTd.textContent = apellidos;
        this.dniDoctorTd.textContent = dniDoctor;
        this.nombreCompaniaTd.textContent = nombreCompania;

        this.row.appendChild(this.dniTd);
        this.row.appendChild(this.nombreTd);
        this.row.appendChild(this.apellidosTd);
        this.row.appendChild(this.dniDoctorTd);
        this.row.appendChild(this.nombreCompaniaTd);
    }

    getRow() {
        return this.row;
    }
}