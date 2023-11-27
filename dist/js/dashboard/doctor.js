import { $modalDoctorContainer } from "../components/modal-doctor.js";
import { search } from "./search.js";

const $searchDoctorSelect = document.getElementById('search-doctor-select');
export const $searchDoctor = document.getElementById('search-doctor');
const $searchDoctorImg = document.getElementById('search-doctor-img');
export const $tableDoctor = document.getElementById('table-doctor');
export let tablaDoctorContent;

const $buttonNuevoCompania = document.getElementById('nuevo-doctor');

// Events
window.addEventListener('load', () => {
    tablaDoctorContent = $tableDoctor.innerHTML;
})

$searchDoctorSelect.addEventListener('change', () => {
    if ($searchDoctor.value) {
        search($tableDoctor, tablaDoctorContent, $searchDoctorSelect.value, $searchDoctor.value);
    }
})

$searchDoctor.addEventListener('keyup', () => {
    if (!$searchDoctor.value) {
        $tableDoctor.innerHTML = tablaDoctorContent;
    }
})

$searchDoctor.addEventListener('keyup', () => {
    if ($searchDoctor.value) {
        search($tableDoctor, tablaDoctorContent, $searchDoctorSelect.value, $searchDoctor.value);
    }
})

$searchDoctorImg.addEventListener('click', () => {
    search($tableDoctor, tablaDoctorContent, $searchDoctorSelect.value, $searchDoctor.value);
});

$buttonNuevoCompania.addEventListener('click', () => {
    $searchDoctor.value = '';
    $tableDoctor.innerHTML = tablaDoctorContent;
    $modalDoctorContainer.classList.remove('hide');
})

// Functions
/**
 * Esta función es necesaria para poder cambiar las filas de la tabla desde otro módulo, ya que no se
 * puede cambiar el valor de la variable original cuando esta es exportada
 */
export function changeOldTableCompaniaContent(content) {
    tablaDoctorContent = content;
}