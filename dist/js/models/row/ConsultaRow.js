import { Row } from "./Row.js";

/**
 * Crea una fila para la tabla Consulta
 */
export class ConsultaRow extends Row {
    constructor(dniEnfermo, dniDoctor, numSala, fechaConsulta, nombreMedicamento, precioMedicamento, fechaCaducidadMedicamento) {
        const row = document.createElement('tr');
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

        row.appendChild(dniEnfermoTd);
        row.appendChild(dniDoctorTd);
        row.appendChild(numSalaTd);
        row.appendChild(fechaConsultaTd);
        row.appendChild(nombreMedicamentoTd);
        row.appendChild(precioMedicamentoTd);
        row.appendChild(fechaCaducidadMedicamentoTd);
        super(row);
    }
}