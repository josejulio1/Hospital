import { DoctorRow } from "../models/row/DoctorRow.js";
import { DoctorListItem } from "../models/list-item/DoctorListItem.js";
import { fetchOnResponseOperation } from "./modal.js";
import { $listaDoctoresConsulta } from "./modal-consulta.js";
import { $tableDoctor, changeOldTableDoctorContent } from "../dashboard/doctor.js";
import { checkDni, isHtmlTag } from "../utils/checkers.js";
import { $listaDoctoresEnfermo } from "./modal-enfermo.js";

export const $modalDoctorContainer = document.getElementById('modal-doctor-container');

const $dniDoctor = document.getElementById('dni-doctor');
const $dniDoctorError = document.getElementById('dni-doctor-error');
const $nombreDoctor = document.getElementById('nombre-doctor');
const $nombreDoctorError = document.getElementById('nombre-doctor-error');
const $apellidosDoctor = document.getElementById('apellidos-doctor');
const $apellidosDoctorError = document.getElementById('apellidos-doctor-error');

const $buttonCrearDoctor = document.getElementById('accept-doctor');

// Events
$buttonCrearDoctor.addEventListener('click', e => {
    e.preventDefault();

    let hayErrores = false;
    if (isHtmlTag.test($dniDoctor.value) || !$dniDoctor.value || !checkDni($dniDoctor.value)) {
        $dniDoctor.classList.add('border-input-error');
        $dniDoctorError.classList.remove('hide');
        hayErrores = true;
    }

    if (isHtmlTag.test($nombreDoctor.value) || !$nombreDoctor.value) {
        $nombreDoctor.classList.add('border-input-error');
        $nombreDoctorError.classList.remove('hide');
        hayErrores = true;
    }

    if (isHtmlTag.test($apellidosDoctor.value) || !$apellidosDoctor.value) {
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
        const dniDoctor = $dniDoctor.value;
        const nombreDoctor = $nombreDoctor.value;
        const apellidosDoctor = $apellidosDoctor.value;
        const containsError = fetchOnResponseOperation(response.status, $tableDoctor,
            new DoctorRow($dniDoctor.value, $nombreDoctor.value, $apellidosDoctor.value).getRow(),
            changeOldTableDoctorContent, clearFields, 'El doctor se creó correctamente');
        if (containsError) return;
        const doctorListItem = new DoctorListItem(dniDoctor, nombreDoctor + ' ' + apellidosDoctor).getListItem();
        $listaDoctoresConsulta.appendChild(doctorListItem);
        $listaDoctoresEnfermo.appendChild(doctorListItem);
    })
})

// Functions
/**
 * Elimina la información de los input en caso de que se haya creado exitosamente un registro,
 * para poder introducir uno nuevo a continuación y que el usuario no tenga que borrar los campos manualmente
 */
function clearFields() {
    $dniDoctor.value = '';
    $nombreDoctor.value = '';
    $apellidosDoctor.value = '';
}