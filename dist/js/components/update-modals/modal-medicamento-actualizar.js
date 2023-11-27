import { $tableMedicamento, changeOldTableMedicamentoContent } from "../../dashboard/medicamento.js";
import { isNumber } from "../../utils/checkers.js";
import { hideModal } from "../modal.js";
import { $modalInfoContainer, correctModalInfo, incorrectModalInfo } from "../modal-info.js";
import { ERROR_MESSAGES } from "../../dashboard/errors.js";

export const $modalMedicamentoActualizarContainer = document.getElementById('modal-medicamento-actualizar-container');

export const $nombreMedicamentoActualizar = document.getElementById('nombre-medicamento-actualizar');
const $nombreMedicamentoActualizarError = document.getElementById('nombre-medicamento-actualizar-error');
export const $precioMedicamentoActualizar = document.getElementById('precio-medicamento-actualizar');
const $precioMedicamentoActualizarError = document.getElementById('precio-medicamento-actualizar-error');

const $buttonActualizarMedicamento = document.getElementById('accept-medicamento-actualizar');

// Events
$buttonActualizarMedicamento.addEventListener('click', e => {
    e.preventDefault();

    let hayErrores = false;
    if (!$nombreMedicamentoActualizar.value) {
        $nombreMedicamentoActualizar.classList.add('border-input-error');
        $nombreMedicamentoActualizarError.classList.remove('hide');
        hayErrores = true;
    }

    if (!$precioMedicamentoActualizar.value || !isNumber.test($precioMedicamentoActualizar.value)) {
        $precioMedicamentoActualizar.classList.add('border-input-error');
        $precioMedicamentoActualizarError.classList.remove('hide');
        hayErrores = true;
    }

    if (hayErrores) {
        return;
    }

    const fd = new FormData();
    const selectedRow = document.getElementById('selected-row');
    fd.append('id', selectedRow.getAttribute('value'));
    fd.append($nombreMedicamentoActualizar.id, $nombreMedicamentoActualizar.value);
    fd.append($precioMedicamentoActualizar.id, $precioMedicamentoActualizar.value);
    fetch('/api/controllers/update-medicine.php', {
        method: 'POST',
        body: fd
    })
    .then(response => {
        $modalInfoContainer.classList.remove('hide');
        if (response.status != 200) {
            hideModal();
            incorrectModalInfo(ERROR_MESSAGES[responseStatus]);
            return;
        }
        selectedRow.children[0].textContent = $nombreMedicamentoActualizar.value;
        selectedRow.children[1].textContent = $precioMedicamentoActualizar.value;
        // TODO: Al actualizar el medicamento, actualizarlo en tiempo real en la tabla consultas
        hideModal();
        changeOldTableMedicamentoContent($tableMedicamento.innerHTML);
        clearFields();
        correctModalInfo('El medicamento de actualizó con exito');
    })
})

function clearFields() {
    $nombreMedicamentoActualizar.value = '';
    $precioMedicamentoActualizar.value = '';
}