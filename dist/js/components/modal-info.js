export const $modalInfoContainer = document.getElementById('modal-info-container');
export const $modalInfo = document.getElementById('modal-info');
export const $modalInfoCorrecto = document.getElementById('modal-info-correcto');
export const $modalInfoIncorrecto = document.getElementById('modal-info-incorrecto');
export const $modalInfoMensaje = document.getElementById('modal-info-mensaje');
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