import { CompaniaRow } from "../models/row/CompaniaRow.js";
import { CompaniaListItem } from "../models/list-item/CompaniaListItem.js";
import { $tableCompania, changeOldTableCompaniaContent } from "../dashboard/compania.js";
import { fetchOnResponseOperation } from "./modal.js";
import { $listaCompaniasEnfermo } from "./modal-enfermo.js";
import { isHtmlTag } from "../utils/checkers.js";

export const $modalCompaniaContainer = document.getElementById('modal-compania-container');

const $nombreCompania = document.getElementById('nombre-compania-compania');
const $nombreCompaniaError = document.getElementById('nombre-compania-compania-error');

const $buttonCrearCompania = document.getElementById('accept-compania');

// Events
$buttonCrearCompania.addEventListener('click', e => {
    e.preventDefault();

    if (isHtmlTag.test($nombreCompania.value) || !$nombreCompania.value) {
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
        const nombreCompania = $nombreCompania.value;
        const containsError = fetchOnResponseOperation(response.status, $tableCompania, new CompaniaRow($nombreCompania.value).getRow(), changeOldTableCompaniaContent, clearFields, 'La compañía se creó correctamente');
        if (containsError) return;
        $listaCompaniasEnfermo.appendChild(new CompaniaListItem(nombreCompania).getListItem());
    })
})

// Functions
/**
 * Elimina la información de los input en caso de que se haya creado exitosamente un registro,
 * para poder introducir uno nuevo a continuación y que el usuario no tenga que borrar los campos manualmente
 */
function clearFields() {
    $nombreCompania.value = '';
}