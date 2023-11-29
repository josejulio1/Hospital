import { EnfermoRow } from "../models/row/EnfermoRow.js";
import { EnfermoListItem } from "../models/list-item/EnfermoListItem.js";
import { $tableEnfermo, changeOldTableEnfermoContent } from "../dashboard/enfermo.js";
import { $listaEnfermosConsulta } from "./modal-consulta.js";
import { fetchOnResponseOperation } from "./modal.js";
import { checkDni, isHtmlTag } from "../utils/checkers.js";

// Modal
export const $modalEnfermoContainer = document.getElementById('modal-enfermo-container');

// Data
const $dniEnfermo = document.getElementById('dni-enfermo');
const $dniEnfermoError = document.getElementById('dni-enfermo-error');
const $nombreEnfermo = document.getElementById('nombre-enfermo');
const $nombreEnfermoError = document.getElementById('nombre-enfermo-error');
const $apellidosEnfermo = document.getElementById('apellidos-enfermo');
const $apellidosEnfermoError = document.getElementById('apellidos-enfermo-error');
const $dniDoctorEnfermo = document.getElementById('dni-doctor-enfermo');
const $dniDoctorEnfermoError = document.getElementById('dni-doctor-enfermo-error');
export const $listaDoctoresEnfermo = document.getElementById('lista-doctores-enfermo');
const $listaDoctoresItems = document.querySelectorAll('.lista-doctores-item');
const $nombreCompania = document.getElementById('nombre-compania');
const $nombreCompaniaError = document.getElementById('nombre-compania-error');
export const $listaCompaniasEnfermo = document.getElementById('lista-companias-enfermo');
const $listaCompaniasItems = document.querySelectorAll('.lista-companias-item');
const $buttonCrearEnfermo = document.getElementById('accept-enfermo');

// Events
$buttonCrearEnfermo.addEventListener('click', e => {
    e.preventDefault();

    let hayErrores = false;
    if (isHtmlTag.test($dniEnfermo.value) || !$dniEnfermo.value || !checkDni($dniEnfermo.value)) {
        $dniEnfermo.classList.add('border-input-error');
        $dniEnfermoError.classList.remove('hide');
        hayErrores = true;
    }
    
    if (isHtmlTag.test($nombreEnfermo.value) || !$nombreEnfermo.value) {
        $nombreEnfermo.classList.add('border-input-error');
        $nombreEnfermoError.classList.remove('hide');
        hayErrores = true;
    }
    
    if (isHtmlTag.test($apellidosEnfermo.value) || !$apellidosEnfermo.value) {
        $apellidosEnfermo.classList.add('border-input-error');
        $apellidosEnfermoError.classList.remove('hide');
        hayErrores = true;
    }
    
    let dniDoctorExiste = false;
    const dniDoctorEnfermoValue = $dniDoctorEnfermo.value;
    for (const dniDoctor of $listaDoctoresItems) {
        if (dniDoctor.children[0].textContent == dniDoctorEnfermoValue) {
            dniDoctorExiste = true;
            break;
        }
    }
    if (isHtmlTag.test($dniDoctorEnfermo.value) || !$dniDoctorEnfermo.value || !dniDoctorExiste) {
        $dniDoctorEnfermo.classList.add('border-input-error');
        $dniDoctorEnfermoError.classList.remove('hide');
        hayErrores = true;
    }
    
    let nombreCompaniaExiste = false;
    const nombreCompaniaValue = $nombreCompania.value;
    for (const nombreCompania of $listaCompaniasItems) {
        if (nombreCompania.children[0].textContent == nombreCompaniaValue) {
            nombreCompaniaExiste = true;
            break;
        }
    }
    if (isHtmlTag.test($nombreCompania.value) || !$nombreCompania.value || !nombreCompaniaExiste) {
        $nombreCompania.classList.add('border-input-error');
        $nombreCompaniaError.classList.remove('hide');
        hayErrores = true;
    }

    if (hayErrores) {
        return;
    }

    const fd = new FormData();
    fd.append($dniEnfermo.id, $dniEnfermo.value);
    fd.append($nombreEnfermo.id, $nombreEnfermo.value);
    fd.append($apellidosEnfermo.id, $apellidosEnfermo.value);
    fd.append($dniDoctorEnfermo.id, $dniDoctorEnfermo.value);
    fd.append($nombreCompania.id, $nombreCompania.value);
    fetch('/api/controllers/insert-patient.php', {
        method: 'POST',
        body: fd
    })
    .then(response => {
        const dniEnfermo = $dniEnfermo.value;
        const nombreEnfermo = $nombreEnfermo.value;
        const containsError = fetchOnResponseOperation(response.status, $tableEnfermo,
            new EnfermoRow($dniEnfermo.value, $nombreEnfermo.value, $apellidosEnfermo.value, $dniDoctorEnfermo.value, $nombreCompania.value).getRow(), changeOldTableEnfermoContent, clearFields, 'El usuario se creó correctamente');
        if (containsError) return;
        $listaEnfermosConsulta.appendChild(new EnfermoListItem(dniEnfermo, nombreEnfermo).getListItem());
    })
})

// Functions
/**
 * Elimina la información de los input en caso de que se haya creado exitosamente un registro,
 * para poder introducir uno nuevo a continuación y que el usuario no tenga que borrar los campos manualmente
 */
function clearFields() {
    $dniEnfermo.value = '';
    $nombreEnfermo.value = '';
    $apellidosEnfermo.value = '';
    $dniDoctorEnfermo.value = '';
    $nombreCompania.value = '';
}