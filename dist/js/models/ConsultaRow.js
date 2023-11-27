export class ConsultaRow {
    constructor(dniEnfermo, dniDoctor, numSala, fechaConsulta, nombreMedicamento, precioMedicamento, fechaCaducidadMedicamento) {
        this.row = document.createElement('tr');
        const dniEnfermoTd = document.createElement('td');
        const dniDoctorTd = document.createElement('td');
        const numSalaTd = document.createElement('td');
        const fechaConsultaTd = document.createElement('td');
        const nombreMedicamentoTd = document.createElement('td');
        const precioMedicamentoTd = document.createElement('td');
        const fechaCaducidadMedicamentoTd = document.createElement('td');

        dniEnfermoTd.textContent = dniEnfermo;
        dniDoctorTd.textContent = dniDoctor;
        numSalaTd.textContent = numSala;
        fechaConsultaTd.textContent = fechaConsulta;
        nombreMedicamentoTd.textContent = nombreMedicamento;
        precioMedicamentoTd.textContent = precioMedicamento;
        fechaCaducidadMedicamentoTd.textContent = fechaCaducidadMedicamento;

        this.row.appendChild(dniEnfermoTd);
        this.row.appendChild(dniDoctorTd);
        this.row.appendChild(numSalaTd);
        this.row.appendChild(fechaConsultaTd);
        this.row.appendChild(nombreMedicamentoTd);
        this.row.appendChild(precioMedicamentoTd);
        this.row.appendChild(fechaCaducidadMedicamentoTd);
    }

    getRow() {
        return this.row;
    }
}