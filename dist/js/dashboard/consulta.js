import { $modalConsultaContainer } from "../components/modal-consulta.js";
import { search } from "./search.js";

const $searchConsultaSelect = document.getElementById('search-consulta-select');
export const $searchConsulta = document.getElementById('search-consulta');
const $searchConsultaImg = document.getElementById('search-consulta-img');
export const $tableConsulta = document.getElementById('table-consulta');
export let tablaConsultaContent;

const $buttonNuevoConsulta = document.getElementById('nuevo-consulta');

// Events
window.addEventListener('load', () => {
    tablaConsultaContent = $tableConsulta.innerHTML;
})

$searchConsultaSelect.addEventListener('change', () => {
    if ($searchConsulta.value) {
        search($tableConsulta, tablaConsultaContent, $searchConsultaSelect.value, $searchConsulta.value);
    }
})

$searchConsulta.addEventListener('keyup', () => {
    if (!$searchConsulta.value) {
        $tableConsulta.innerHTML = tablaConsultaContent;
    }
})

$searchConsulta.addEventListener('keyup', () => {
    if ($searchConsulta.value) {
        search($tableConsulta, tablaConsultaContent, $searchConsultaSelect.value, $searchConsulta.value);
    }
})

$searchConsultaImg.addEventListener('click', () => {
    search($tableConsulta, tablaConsultaContent, $searchConsultaSelect.value, $searchConsulta.value);
});

$buttonNuevoConsulta.addEventListener('click', () => {
    $searchConsulta.value = '';
    $tableConsulta.innerHTML = tablaConsultaContent;
    $modalConsultaContainer.classList.remove('hide');
})

// Functions
/**
 * Esta función es necesaria para poder cambiar las filas de la tabla desde otro módulo, ya que no se
 * puede cambiar el valor de la variable original cuando esta es exportada
 */
export function changeOldTableConsultaContent(content) {
    tablaConsultaContent = content;
}