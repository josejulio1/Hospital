import { EnfermoRow } from "../models/EnfermoRow.js";
import { $tableEnfermo, changeOldTableEnfermoContent } from "../dashboard/enfermo.js";
import { fetchOnResponseOperation } from "./modal.js";
import { checkDni, dniRegex } from "../utils/checkers.js";

// Modal
export const $modalEnfermoContainer = document.getElementById('modal-enfermo-container');

// Data
const $dniEnfermo = document.getElementById('dni-enfermo');
const $dniEnfermoError = document.getElementById('dni-enfermo-error');
const $dniCorrectoImg = document.getElementById('dni-correcto');
const $dniIncorrectoImg = document.getElementById('dni-incorrecto');
const $nombreEnfermo = document.getElementById('nombre-enfermo');
const $nombreEnfermoError = document.getElementById('nombre-enfermo-error');
const $apellidosEnfermo = document.getElementById('apellidos-enfermo');
const $apellidosEnfermoError = document.getElementById('apellidos-enfermo-error');
const $dniDoctorEnfermo = document.getElementById('dni-doctor-enfermo');
const $dniDoctorEnfermoError = document.getElementById('dni-doctor-enfermo-error');
const $listaDoctoresItems = document.querySelectorAll('.lista-doctores-item');
const $nombreCompania = document.getElementById('nombre-compania');
const $nombreCompaniaError = document.getElementById('nombre-compania-error');
const $listaCompaniasItems = document.querySelectorAll('.lista-companias-item');
const $buttonCrearEnfermo = document.getElementById('accept-enfermo');

// Events
$dniEnfermo.addEventListener('keyup', () => {
    if (dniRegex.test($dniEnfermo.value) && checkDni($dniEnfermo.value)) {
        $dniIncorrectoImg.classList.add('hide');
        $dniCorrectoImg.classList.remove('hide');
    } else {
        $dniCorrectoImg.classList.add('hide');
        $dniIncorrectoImg.classList.remove('hide');
    }
})

$buttonCrearEnfermo.addEventListener('click', e => {
    e.preventDefault();

    let hayErrores = false;
    if (!$dniEnfermo.value || !checkDni($dniEnfermo.value)) {
        $dniEnfermo.classList.add('border-input-error');
        $dniEnfermoError.classList.remove('hide');
        hayErrores = true;
    }
    
    if (!$nombreEnfermo.value) {
        $nombreEnfermo.classList.add('border-input-error');
        $nombreEnfermoError.classList.remove('hide');
        hayErrores = true;
    }
    
    if (!$apellidosEnfermo.value) {
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
    if (!$dniDoctorEnfermo.value || !dniDoctorExiste) {
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
    if (!$nombreCompania.value || !nombreCompaniaExiste) {
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
        const containsError = fetchOnResponseOperation(response.status, $tableEnfermo,
            new EnfermoRow($dniEnfermo.value, $nombreEnfermo.value, $apellidosEnfermo.value, $dniDoctorEnfermo.value, $nombreCompania.value).getRow(), changeOldTableEnfermoContent, clearFields, 'El usuario se creó correctamente');
        if (containsError) return;
    })
})

// Functions
function clearFields() {
    $dniEnfermo.value = '';
    $dniCorrectoImg.classList.add('hide');
    $nombreEnfermo.value = '';
    $apellidosEnfermo.value = '';
    $dniDoctorEnfermo.value = '';
    $nombreCompania.value = '';
}