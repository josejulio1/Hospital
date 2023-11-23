import { EnfermoRow } from "../models/EnfermoRow.js";
import { $tableEnfermo, sortColumn } from "../dashboard/enfermo.js";
import { ERROR_MESSAGES, removeErrors } from "../utils/utils.js";
import { $modalInfoContainer, $modalInfoCorrecto, $modalInfoIncorrecto, $modalInfoMensaje } from "./modal-info.js";

const $buttonNuevoEnfermo = document.getElementById('nuevo-enfermo');

// Modal
const $modalEnfermoContainer = document.getElementById('modal-enfermo-container');
const $modalEnfermo = document.getElementById('modal-enfermo');
const $buttonCancelEnfermo = document.getElementById('cancel-enfermo');

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
const $optionsDoctores = document.querySelectorAll('#doctores option');
const $nombreCompania = document.getElementById('nombre-compania');
const $nombreCompaniaError = document.getElementById('nombre-compania-error');
const $optionsCompanias = document.querySelectorAll('#companias option');
const $buttonCrearEnfermo = document.getElementById('accept-enfermo');

// Regex
const dniRegex = new RegExp(/^[0-9]{8}[a-zA-Z]$/);

// Modal
$modalEnfermoContainer.addEventListener('click', hideModal);

$modalEnfermo.addEventListener('click', e => e.stopPropagation());

$buttonCancelEnfermo.addEventListener('click', hideModal);

// Modal Form
$buttonNuevoEnfermo.addEventListener('click', () => {
    $modalEnfermoContainer.classList.remove('hide');
})

$dniEnfermo.addEventListener('focusout', removeErrors);
$nombreEnfermo.addEventListener('focusout', removeErrors);
$apellidosEnfermo.addEventListener('focusout', removeErrors);
$dniDoctorEnfermo.addEventListener('focusout', removeErrors);
$nombreCompania.addEventListener('focusout', removeErrors);

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
    const optionsDniDoctor = $optionsDoctores.values();
    const dniDoctorEnfermoValue = $dniDoctorEnfermo.value;
    for (const dniDoctor of optionsDniDoctor) {
        if (dniDoctor.value == dniDoctorEnfermoValue) {
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
    const optionsNombreCompania = $optionsCompanias.values();
    const nombreCompaniaValue = $nombreCompania.value;
    for (const nombreCompania of optionsNombreCompania) {
        if (nombreCompania.value == nombreCompaniaValue) {
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
    fetch('/api/controllers/insert.php', {
        method: 'POST',
        body: fd
    })
    .then(response => {
        hideModal();
        $modalInfoContainer.classList.remove('hide');
        if (response.status != 200) {
            $modalInfoMensaje.textContent = ERROR_MESSAGES[response.status];
            $modalInfoIncorrecto.classList.remove('hide');
            return;
        }
        $tableEnfermo.appendChild(new EnfermoRow($dniEnfermo.value, $nombreEnfermo.value, $apellidosEnfermo.value, $dniDoctorEnfermo.value, $nombreCompania.textContent).getRow());
        sortColumn(0, -1);
        clearFields();
        $modalInfoCorrecto.classList.remove('hide');
        $modalInfoMensaje.textContent = 'El usuario se creó correctamente';
    })
})

// Functions
/**
 * Comprueba si la letra de un DNI introducido se corresponde con dicho DNI o no
 * @param {string} dni 
 * @returns Si el número coincide con la letra, devolverá un true, sino, false
 */
function checkDni(dni) {
    const letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
    return letras[parseInt(dni.substring(0, dni.length - 1)) % 23] == dni.charAt(dni.length - 1);
}

function hideModal() {
    $modalEnfermo.classList.add('close-modal');
    $modalEnfermo.addEventListener('animationend', function listener() {
        $modalEnfermoContainer.classList.add('hide');
        $modalEnfermo.classList.remove('close-modal');
        $modalEnfermo.removeEventListener('animationend', listener);
    })
}

function clearFields() {
    $dniEnfermo.value = '';
    $dniCorrectoImg.classList.add('hide');
    $nombreEnfermo.value = '';
    $apellidosEnfermo.value = '';
    $dniDoctorEnfermo.value = '';
    $nombreCompania.value = '';
}