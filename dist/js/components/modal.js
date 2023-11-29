import { ERROR_MESSAGES } from "../dashboard/errors.js";
import { checkDni, dniRegex } from "../utils/checkers.js";
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

// Comprobar en los campos con DNI si el DNI introducido es correcto o no
document.querySelectorAll('.dni-container').forEach(dniContainer => {
    dniContainer.children[0].addEventListener('keyup', e => {
        const target = e.target;
        const dniCorrectoImg = document.getElementById(`${target.id}-correcto`);
        const dniIncorrectoImg = document.getElementById(`${target.id}-incorrecto`);
        if (dniRegex.test(target.value) && checkDni(target.value)) {
            dniIncorrectoImg.classList.add('hide');
            dniCorrectoImg.classList.remove('hide');
        } else {
            dniCorrectoImg.classList.add('hide');
            dniIncorrectoImg.classList.remove('hide');
        }
    })
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

/**
 * Esta función se utiliza para evitar la redundancia de código al obtener una respuesta de la API REST,
 * ya que se realiza el mismo proceso pero con distintas variables. Se utiliza al crear un registro nuevo en
 * cualquier tabla
 * @param {Number} responseStatus Código de respuesta HTTP recibida por la API REST
 * @param {HTMLElement} tableElement Tabla a la que se le quiere añadir una fila en caso de éxito
 * @param {*} row Fila que se quiere añadir a la tabla
 * @param {*} cbChangeOldTable Función para cambiar la tabla antigua, para que cuando se haya una búsqueda en la tabla,
 * al quitar la búsqueda, volver a tener las filas de antes más la nueva
 * @param {*} cbClearFields Función para borrar los valores de los input del modal en caso de éxito, para poder volver a introducir datos
 * @param {*} correctMessage Mensaje a poner en el modal de información en caso de éxito
 * @returns Devuelve false si no contiene errores (código de estado 200) y true si hubo error (cualquier código de estado que no sea 200)
 */
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
    cbClearFields();
    correctModalInfo(correctMessage);
    return !containsError;
}