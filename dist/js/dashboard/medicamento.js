import { $modalMedicamentoContainer } from "../components/modal-medicamento.js";
import { $modalMedicamentoActualizarContainer, $nombreMedicamentoActualizar, $precioMedicamentoActualizar } from "../components/update-modals/modal-medicamento-actualizar.js";
import { search } from "./search.js";

const $searchMedicamentoSelect = document.getElementById('search-medicamento-select');
export const $searchMedicamento = document.getElementById('search-medicamento');
const $searchMedicamentoImg = document.getElementById('search-medicamento-img');
export const $tableMedicamento = document.getElementById('table-medicamento');
export let tablaMedicamentoContent;

const $buttonNuevoMedicamento = document.getElementById('nuevo-medicamento');

// Events
window.addEventListener('load', () => {
    tablaMedicamentoContent = $tableMedicamento.innerHTML;
})

document.querySelectorAll('#table-medicamento tr').forEach(row => {
    row.addEventListener('click', clickEventListenerMedicamentoRow);
})

$searchMedicamentoSelect.addEventListener('change', () => {
    if ($searchMedicamento.value) {
        search($tableMedicamento, tablaMedicamentoContent, $searchMedicamentoSelect.value, $searchMedicamento.value);
    }
})

$searchMedicamento.addEventListener('keyup', () => {
    if (!$searchMedicamento.value) {
        $tableMedicamento.innerHTML = tablaMedicamentoContent;
        document.querySelectorAll('#table-medicamento tr').forEach(row => {
            row.addEventListener('click', clickEventListenerMedicamentoRow);
        })
    }
})

$searchMedicamento.addEventListener('keyup', () => {
    if ($searchMedicamento.value) {
        search($tableMedicamento, tablaMedicamentoContent, $searchMedicamentoSelect.value, $searchMedicamento.value);
    }
})

$searchMedicamentoImg.addEventListener('click', () => {
    search($tableMedicamento, tablaMedicamentoContent, $searchMedicamentoSelect.value, $searchMedicamento.value);
});

$buttonNuevoMedicamento.addEventListener('click', () => {
    $searchMedicamento.value = '';
    $tableMedicamento.innerHTML = tablaMedicamentoContent;
    document.querySelectorAll('#table-medicamento tr').forEach(row => {
        row.addEventListener('click', clickEventListenerMedicamentoRow);
    })
    $modalMedicamentoContainer.classList.remove('hide');
})

// Functions
/**
 * Esta función es necesaria para poder cambiar las filas de la tabla desde otro módulo, ya que no se
 * puede cambiar el valor de la variable original cuando esta es exportada
 */
export function changeOldTableMedicamentoContent(content) {
    tablaMedicamentoContent = content;
}

/**
 * Hace que al pulsar una fila de la tabla medicamento, se muestre el modal de actualizar medicamento y los datos
 * de la fila se pongan en el modal
 * @param {Event} e Fila que acciona el evento
 */
export function clickEventListenerMedicamentoRow(e) {
    const target = e.target.parentNode;
    target.id = 'selected-row';
    $modalMedicamentoActualizarContainer.classList.remove('hide');
    $nombreMedicamentoActualizar.value = target.children[0].textContent;
    $precioMedicamentoActualizar.value = target.children[1].textContent;   
}