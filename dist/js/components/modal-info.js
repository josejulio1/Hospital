export const $modalInfoContainer = document.getElementById('modal-info-container');
const $modalInfoCorrecto = document.getElementById('modal-info-correcto');
const $modalInfoIncorrecto = document.getElementById('modal-info-incorrecto');
const $modalInfoMensaje = document.getElementById('modal-info-mensaje');

/**
 * Abre el modal y lo pone en modo correcto (muestra la imagen de éxito)
 * @param {String} message Mensaje a colocar en el modal
 */
export function correctModalInfo(message) {
    setModalInfoDefault();
    $modalInfoCorrecto.classList.remove('hide');
    $modalInfoMensaje.textContent = message;
}

/**
 * Abre el modal y lo pone en modo incorrecto (muestra la imagen de error)
 * @param {String} message Mensaje a colocar en el modal
 */
export function incorrectModalInfo(message) {
    setModalInfoDefault();
    $modalInfoIncorrecto.classList.remove('hide');
    $modalInfoMensaje.textContent = message;
}

/**
 * Vuelve a poner el modal por defecto, ocultando la imagen de éxito y la de error
 */
function setModalInfoDefault() {
    $modalInfoCorrecto.classList.add('hide');
    $modalInfoIncorrecto.classList.add('hide');
}