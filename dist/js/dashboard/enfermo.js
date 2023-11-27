import { $modalEnfermoContainer } from "../components/modal-enfermo.js";
import { search } from "./search.js";

const $searchEnfermoSelect = document.getElementById('search-enfermo-select');
export const $searchEnfermo = document.getElementById('search-enfermo');
const $searchEnfermoImg = document.getElementById('search-enfermo-img');
export const $tableEnfermo = document.getElementById('table-enfermo');
export let tablaEnfermoContent;

const $buttonNuevoEnfermo = document.getElementById('nuevo-enfermo');

// Events
window.addEventListener('load', () => {
    tablaEnfermoContent = $tableEnfermo.innerHTML;
})

$searchEnfermoSelect.addEventListener('change', () => {
    if ($searchEnfermo.value) {
        search($tableEnfermo, tablaEnfermoContent, $searchEnfermoSelect.value, $searchEnfermo.value);
    }
})

$searchEnfermo.addEventListener('keyup', () => {
    if (!$searchEnfermo.value) {
        $tableEnfermo.innerHTML = tablaEnfermoContent;
    }
})

$searchEnfermo.addEventListener('keyup', () => {
    if ($searchEnfermo.value) {
        search($tableEnfermo, tablaEnfermoContent, $searchEnfermoSelect.value, $searchEnfermo.value);
    }
})

$searchEnfermoImg.addEventListener('click', () => {
    search($tableEnfermo, tablaEnfermoContent, $searchEnfermoSelect.value, $searchEnfermo.value);
});

$buttonNuevoEnfermo.addEventListener('click', () => {
    $searchEnfermo.value = '';
    $tableEnfermo.innerHTML = tablaEnfermoContent;
    $modalEnfermoContainer.classList.remove('hide');
})

// Functions
/**
 * Esta función es necesaria para poder cambiar las filas de la tabla desde otro módulo, ya que no se
 * puede cambiar el valor de la variable original cuando esta es exportada
 */
export function changeOldTableEnfermoContent(content) {
    tablaEnfermoContent = content;
}