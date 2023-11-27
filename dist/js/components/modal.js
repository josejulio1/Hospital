import { ERROR_MESSAGES } from "../dashboard/errors.js";
import { removeErrors } from "../utils/utils.js";
import { $modalInfoContainer, correctModalInfo, incorrectModalInfo } from "./modal-info.js";

// Esconder modal al hacer click sobre los exteriores
document.querySelectorAll('.modal-container').forEach(modalContainer => {
    modalContainer.addEventListener('mousedown', hideModal);
})

// Prevenir que se cierre el modal al pulsar dentro
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('mousedown', e => e.stopPropagation());
})

// Eliminar mensaje de error al quitar foco en cualquier campo de texto
document.querySelectorAll('.input-form').forEach(inputForm => {
    inputForm.addEventListener('focusout', removeErrors);
})

// Cerrar modal al pulsar botón cancelar
document.querySelectorAll('.cancel').forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();
        hideModal();
    });
})

// Abrir lista desplegable de opciones al poner focus en input de la lista y al pulsar un elemento de la lista, ocultar
document.querySelectorAll('.list-relative input').forEach(input => {
    input.addEventListener('focusin', e => e.target.nextElementSibling.classList.remove('hide'));
    input.addEventListener('focusout', e => setTimeout(() => {
        e.target.nextElementSibling.classList.add('hide');
    }, 200));
})

// Introducir valor de lista desplegable de opciones en su campo input respectivo
document.querySelectorAll('.list').forEach(list => {
    list.addEventListener('click', e => {
        const target = e.target;
        // Comprobación de si es un article la etiqueta seleccionada porque a veces sucede un bug que selecciona la lista
        if (target.tagName == 'ARTICLE') {
            list.classList.add('hide');
            list.previousElementSibling.value = target.children[0].textContent;
        }
    })
})

/**
 * Esconde el modal que haya abierto
 */
export function hideModal() {
    const selectedRow = document.getElementById('selected-row');
    if (selectedRow) {
        selectedRow.id = '';
    }
    const openedModal = document.querySelector('.modal-container:not(.hide) .modal');
    openedModal.classList.add('close-modal');
    openedModal.addEventListener('animationend', function listener() {
        document.querySelector('.modal-container:not(.hide)').classList.add('hide');
        openedModal.classList.remove('close-modal');
        openedModal.removeEventListener('animationend', listener);
    })
}

export function fetchOnResponseOperation(responseStatus, tableElement, row, cbChangeOldTable, cbClearFields, correctMessage) {
    let containsError = true;
    hideModal();
    $modalInfoContainer.classList.remove('hide');
    if (responseStatus != 200) {
        incorrectModalInfo(ERROR_MESSAGES[responseStatus]);
        return containsError;
    }
    tableElement.appendChild(row);
    cbChangeOldTable(tableElement.innerHTML);
    /* sortColumn(tableElement, 0, -1); */
    cbClearFields();
    correctModalInfo(correctMessage);
    return !containsError;
}