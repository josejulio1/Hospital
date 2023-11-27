import { $modalCompaniaContainer } from "../components/modal-compania.js";
import { search } from "./search.js";

export const $searchCompania = document.getElementById('search-compania');
const $searchCompaniaImg = document.getElementById('search-compania-img');
export const $tableCompania = document.getElementById('table-compania');
export let tablaCompaniaContent;

const $buttonNuevoCompania = document.getElementById('nuevo-compania');

// Events
window.addEventListener('load', () => {
    tablaCompaniaContent = $tableCompania.innerHTML;
})

$searchCompania.addEventListener('keyup', () => {
    if (!$searchCompania.value) {
        $tableCompania.innerHTML = tablaCompaniaContent;
    }
})

$searchCompania.addEventListener('keyup', () => {
    if ($searchCompania.value) {
        search($tableCompania, tablaCompaniaContent, 0, $searchCompania.value);
    }
})

$searchCompaniaImg.addEventListener('click', () => {
    search($tableCompania, tablaCompaniaContent, 0, $searchCompania.value);
});

$buttonNuevoCompania.addEventListener('click', () => {
    $searchCompania.value = '';
    $tableCompania.innerHTML = tablaCompaniaContent;
    $modalCompaniaContainer.classList.remove('hide');
})

// Functions
/**
 * Esta función es necesaria para poder cambiar las filas de la tabla desde otro módulo, ya que no se
 * puede cambiar el valor de la variable original cuando esta es exportada
 */
export function changeOldTableCompaniaContent(content) {
    tablaCompaniaContent = content;
}