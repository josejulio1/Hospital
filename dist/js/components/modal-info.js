export const $modalInfoContainer = document.getElementById('modal-info-container');
const $modalInfoCorrecto = document.getElementById('modal-info-correcto');
const $modalInfoIncorrecto = document.getElementById('modal-info-incorrecto');
const $modalInfoMensaje = document.getElementById('modal-info-mensaje');

export function correctModalInfo(message) {
    setModalInfoDefault();
    $modalInfoCorrecto.classList.remove('hide');
    $modalInfoMensaje.textContent = message;
}

export function incorrectModalInfo(message) {
    setModalInfoDefault();
    $modalInfoIncorrecto.classList.remove('hide');
    $modalInfoMensaje.textContent = message;
}

function setModalInfoDefault() {
    $modalInfoCorrecto.classList.add('hide');
    $modalInfoIncorrecto.classList.add('hide');
}