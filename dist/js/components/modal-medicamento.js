import { MedicamentoRow } from "../models/row/MedicamentoRow.js";
import { MedicamentoListItem } from "../models/list-item/MedicamentoListItem.js";
import { $tableMedicamento, changeOldTableMedicamentoContent, clickEventListenerMedicamentoRow } from "../dashboard/medicamento.js";
import { isDate, isNumber, isHtmlTag } from "../utils/checkers.js";
import { fetchOnResponseOperation } from "./modal.js";
import { $listaMedicamentosConsulta } from "./modal-consulta.js";

export const $modalMedicamentoContainer = document.getElementById('modal-medicamento-container');

const $nombreMedicamento = document.getElementById('nombre-medicamento');
const $nombreMedicamentoError = document.getElementById('nombre-medicamento-error');
const $precioMedicamento = document.getElementById('precio-medicamento');
const $precioMedicamentoError = document.getElementById('precio-medicamento-error');
const $fechaCaducidadMedicamento = document.getElementById('fecha-caducidad-medicamento');
const $fechaCaducidadMedicamentoError = document.getElementById('fecha-caducidad-medicamento-error');

const $buttonCrearMedicamento = document.getElementById('accept-medicamento');

// Events
$buttonCrearMedicamento.addEventListener('click', e => {
    e.preventDefault();

    let hayErrores = false;
    if (isHtmlTag.test($nombreMedicamento.value) || !$nombreMedicamento.value) {
        $nombreMedicamento.classList.add('border-input-error');
        $nombreMedicamentoError.classList.remove('hide');
        hayErrores = true;
    }

    if (isHtmlTag.test($precioMedicamento.value) || !$precioMedicamento.value || !isNumber.test($precioMedicamento.value)) {
        $precioMedicamento.classList.add('border-input-error');
        $precioMedicamentoError.classList.remove('hide');
        hayErrores = true;
    }

    if (isHtmlTag.test($fechaCaducidadMedicamento.value) || !$fechaCaducidadMedicamento.value || !isDate.test($fechaCaducidadMedicamento.value)) {
        $fechaCaducidadMedicamento.classList.add('border-input-error');
        $fechaCaducidadMedicamentoError.classList.remove('hide');
        hayErrores = true;
    }

    if (hayErrores) {
        return;
    }

    const fd = new FormData();
    fd.append($nombreMedicamento.id, $nombreMedicamento.value);
    fd.append($precioMedicamento.id, $precioMedicamento.value);
    fd.append($fechaCaducidadMedicamento.id, $fechaCaducidadMedicamento.value);
    fetch('/api/controllers/insert-medicine.php', {
        method: 'POST',
        body: fd
    })
    .then(response => {
        const nombreMedicamento = $nombreMedicamento.value;
        const precioMedicamento = $precioMedicamento.value;
        const fechaCaducidadMedicamento = $fechaCaducidadMedicamento.value;
        const medicamentoRow = new MedicamentoRow(nombreMedicamento, precioMedicamento, fechaCaducidadMedicamento).getRow();
        medicamentoRow.addEventListener('click', clickEventListenerMedicamentoRow);
        // Obtener el último ID de todas las filas para sumarle de ID a la recién creada +1
        const $rows = [...document.querySelectorAll('#table-medicamento tr')];
        $rows.sort((a, b) => parseInt(a.getAttribute('value') < parseInt(b.getAttribute('value') ? -1 : 1)));
        const containsError = fetchOnResponseOperation(response.status, $tableMedicamento,
            medicamentoRow, changeOldTableMedicamentoContent, clearFields, 'El medicamento se creó correctamente');
        if (containsError) return;
        const nextId = parseInt($rows.pop().getAttribute('value')) + 1;
        document.querySelector('#table-medicamento tr:last-child').setAttribute('value', nextId);
        $listaMedicamentosConsulta.appendChild(new MedicamentoListItem(nextId, nombreMedicamento,
            precioMedicamento, fechaCaducidadMedicamento).getListItem());
    })
})

// Functions
/**
 * Elimina la información de los input en caso de que se haya creado exitosamente un registro,
 * para poder introducir uno nuevo a continuación y que el usuario no tenga que borrar los campos manualmente
 */
function clearFields() {
    $nombreMedicamento.value = '';
    $precioMedicamento.value = '';
    $fechaCaducidadMedicamento.value = '';
}