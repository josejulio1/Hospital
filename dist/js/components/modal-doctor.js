import { DoctorRow } from "../models/DoctorRow.js";
import { fetchOnResponseOperation } from "./modal.js";

export const $modalDoctorContainer = document.getElementById('modal-doctor-container');

const $dniDoctor = document.getElementById('dni-doctor');
const $dniDoctorError = document.getElementById('dni-doctor-error');
const $nombreDoctor = document.getElementById('nombre-doctor');
const $nombreDoctorError = document.getElementById('nombre-doctor-error');
const $apellidosDoctor = document.getElementById('apellidos-doctor');
const $apellidosDoctorError = document.getElementById('apellidos-doctor-error');

const $buttonCrearDoctor = document.getElementById('accept-compania');

// Events
$buttonCrearDoctor.addEventListener('click', e => {
    e.preventDefault();

    let hayErrores = false;
    if (!$dniDoctor.value) {
        $dniDoctor.classList.add('border-input-error');
        $dniDoctorError.classList.remove('hide');
        hayErrores = true;
    }

    if (!$nombreDoctor.value) {
        $nombreDoctor.classList.add('border-input-error');
        $nombreDoctorError.classList.remove('hide');
        hayErrores = true;
    }

    if (!$apellidosDoctor.value) {
        $apellidosDoctor.classList.add('border-input-error');
        $apellidosDoctorError.classList.remove('hide');
        hayErrores = true;
    }

    if (hayErrores) {
        return;
    }

    const fd = new FormData();
    fd.append($dniDoctor.id, $dniDoctor.value);
    fd.append($nombreDoctor.id, $nombreDoctor.value);
    fd.append($apellidosDoctor.id, $apellidosDoctor.value);
    fetch('/api/controllers/insert-doctor.php', {
        method: 'POST',
        body: fd
    })
    .then(response => {
        const containsError = fetchOnResponseOperation(response.status, $tableCompania,
            new DoctorRow($dniDoctor.value, $nombreDoctor.value, $apellidosDoctor.value).getRow(), changeOldTableCompaniaContent,
            clearFields, 'La compañía se creó correctamente');
        if (containsError) return;
    })
})

function clearFields() {
    $dniDoctor.value = '';
    $nombreDoctor.value = '';
    $apellidosDoctor.value = '';
}