export const $modalInfoContainer = document.getElementById('modal-info-container');
const $modalInfo = document.getElementById('modal-info');
const $modalInfoCorrecto = document.getElementById('modal-info-correcto');
const $modalInfoIncorrecto = document.getElementById('modal-info-incorrecto');
const $modalInfoMensaje = document.getElementById('modal-info-mensaje');
const $buttonModalInfo = document.getElementById('cancel-modal-info');

$buttonModalInfo.addEventListener('click', hideModalInfo);

export function hideModalInfo() {
    $modalInfo.classList.add('close-modal');
    $modalInfo.addEventListener('animationend', function listener() {
        $modalInfoContainer.classList.add('hide');
        $modalInfoCorrecto.classList.add('hide');
        $modalInfoIncorrecto.classList.add('hide');
        $modalInfo.classList.remove('close-modal');
        $modalInfo.removeEventListener('animationend', listener);
    })
}

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