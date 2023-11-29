import { ConsultaRow } from "../models/row/ConsultaRow.js";
import { fetchOnResponseOperation } from "./modal.js";
import { isDate, isHtmlTag, isNumber } from "../utils/checkers.js";
import { $tableConsulta, changeOldTableConsultaContent } from "../dashboard/consulta.js";

// Modal
export const $modalConsultaContainer = document.getElementById('modal-consulta-container');

// Data
const $dniEnfermo = document.getElementById('dni-enfermo-consulta');
const $dniEnfermoError = document.getElementById('dni-enfermo-consulta-error');
export const $listaEnfermosConsulta = document.getElementById('lista-enfermos');
const $listaEnfermosItems = document.querySelectorAll('.lista-enfermos-item-consulta');
const $dniDoctor = document.getElementById('dni-doctor-consulta');
const $dniDoctorError = document.getElementById('dni-doctor-consulta-error');
export const $listaDoctoresConsulta = document.getElementById('lista-doctores');
const $listaDoctoresItems = document.querySelectorAll('.lista-doctores-item-consulta');
const $numSala = document.getElementById('num-sala-consulta');
const $numSalaError = document.getElementById('num-sala-consulta-error');
const $fechaConsulta = document.getElementById('fecha-consulta');
const $medicamento = document.getElementById('medicamento-consulta');
const $medicamentoError = document.getElementById('medicamento-consulta-error');
export const $listaMedicamentosConsulta = document.getElementById('lista-medicamentos-consulta');
const $listaMedicamentoItems = document.querySelectorAll('.lista-medicamentos-item-consulta');
const $fechaConsultaError = document.getElementById('fecha-consulta-error');
const $buttonCrearConsulta = document.getElementById('accept-consulta');

// Events
$buttonCrearConsulta.addEventListener('click', e => {
    e.preventDefault();

    let hayErrores = false;
    let dniEnfermoExiste = false;
    const dniEnfermoValue = $dniEnfermo.value;
    for (const dniEnfermo of $listaEnfermosItems) {
        if (dniEnfermo.children[0].textContent == dniEnfermoValue) {
            dniEnfermoExiste = true;
            break;
        }
    }
    if (isHtmlTag.test($dniEnfermo.value) || !$dniEnfermo.value || !dniEnfermoExiste) {
        $dniEnfermo.classList.add('border-input-error');
        $dniEnfermoError.classList.remove('hide');
        hayErrores = true;
    }

    let dniDoctorExiste = false;
    const dniDoctorEnfermoValue = $dniDoctor.value;
    for (const dniDoctor of $listaDoctoresItems) {
        if (dniDoctor.children[0].textContent == dniDoctorEnfermoValue) {
            dniDoctorExiste = true;
            break;
        }
    }
    if (isHtmlTag.test($dniDoctor.value) || !$dniDoctor.value || !dniDoctorExiste) {
        $dniDoctor.classList.add('border-input-error');
        $dniDoctorError.classList.remove('hide');
        hayErrores = true;
    }

    if (isHtmlTag.test($numSala.value) || !$numSala.value || !isNumber.test($numSala.value)) {
        $numSala.classList.add('border-input-error');
        $numSalaError.classList.remove('hide');
        hayErrores = true;
    }

    if (isHtmlTag.test($fechaConsulta.value) || !$fechaConsulta.value || !isDate.test($fechaConsulta.value)) {
        $fechaConsulta.classList.add('border-input-error');
        $fechaConsultaError.classList.remove('hide');
        hayErrores = true;
    }

    let nombreMedicamento;
    let precioMedicamento;
    let fechaCaducidadMedicamento;
    if ($medicamento.value) {
        let medicamentoExiste = false;
        const medicamentoValue = $medicamento.value;
        for (const medicamento of $listaMedicamentoItems) {
            if (medicamento.children[0].textContent == medicamentoValue) {
                nombreMedicamento = medicamento.children[1].textContent;
                precioMedicamento = medicamento.children[2].textContent;
                fechaCaducidadMedicamento = medicamento.children[3].textContent;
                medicamentoExiste = true;
                break;
            }
        }
        if (!medicamentoExiste) {
            $medicamento.classList.add('border-input-error');
            $medicamentoError.classList.remove('hide');
            hayErrores = true;
        }
    }

    if (hayErrores) {
        return;
    }

    const fd = new FormData();
    fd.append($dniEnfermo.id, $dniEnfermo.value);
    fd.append($dniDoctor.id, $dniDoctor.value);
    fd.append($numSala.id, $numSala.value);
    fd.append($fechaConsulta.id, $fechaConsulta.value);
    if ($medicamento.value) {
        fd.append($medicamento.id, $medicamento.value);
    }
    fetch('/api/controllers/insert-consultation.php', {
        method: 'POST',
        body: fd
    })
    .then(response => {
        const containsError = fetchOnResponseOperation(response.status, $tableConsulta,
            new ConsultaRow($dniEnfermo.value, $dniDoctor.value, $fechaConsulta.value, $numSala.value, nombreMedicamento, precioMedicamento, fechaCaducidadMedicamento).getRow(), changeOldTableConsultaContent, clearFields, 'La consulta se creó correctamente');
        if (containsError) return;
    })
})

// Functions
/**
 * Elimina la información de los input en caso de que se haya creado exitosamente un registro,
 * para poder introducir uno nuevo a continuación y que el usuario no tenga que borrar los campos manualmente
 */
function clearFields() {
    $dniEnfermo.value = '';
    $dniDoctor.value = '';
    $numSala.value = '';
    $fechaConsulta.value = '';
    $medicamento.value = '';
}