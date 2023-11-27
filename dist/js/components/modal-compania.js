import { CompaniaRow } from "../models/CompaniaRow.js";
import { $tableCompania, changeOldTableCompaniaContent } from "../dashboard/compania.js";
import { fetchOnResponseOperation } from "./modal.js";

export const $modalCompaniaContainer = document.getElementById('modal-compania-container');

const $nombreCompania = document.getElementById('nombre-compania-compania');
const $nombreCompaniaError = document.getElementById('nombre-compania-compania-error');

const $buttonCrearCompania = document.getElementById('accept-compania');

// Events
$buttonCrearCompania.addEventListener('click', e => {
    e.preventDefault();

    if (!$nombreCompania.value) {
        $nombreCompania.classList.add('border-input-error');
        $nombreCompaniaError.classList.remove('hide');
        return;
    }

    const fd = new FormData();
    fd.append($nombreCompania.id, $nombreCompania.value);
    fetch('/api/controllers/insert-company.php', {
        method: 'POST',
        body: fd
    })
    .then(response => {
        const containsError = fetchOnResponseOperation(response.status, $tableCompania, new CompaniaRow($nombreCompania.value).getRow(), changeOldTableCompaniaContent, clearFields, 'La compañía se creó correctamente');
        if (containsError) return;
    })
})

function clearFields() {
    $nombreCompania.value = '';
}