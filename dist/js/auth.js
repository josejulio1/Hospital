import { removeErrors } from "./utils/utils.js";

const $usuario = document.getElementById('usuario');
const $usuarioError = document.getElementById('usuario-error');
const $contrasenia = document.getElementById('contrasenia');
const $contraseniaError = document.getElementById('contrasenia-error');
const $form = document.querySelector('form');
const $error = document.getElementById('error');

const $buttonText = document.getElementById('button-text');
const $loading = document.getElementById('loading');

/**
 * Mensajes de error que hay al conectarse con la API REST por la parte de autenticación
 */
export const ERROR_MESSAGES = {
    404: 'Usuario o contraseña incorrectos',
    503: 'No se pudo conectar a la base de datos. Inténtelo más tarde'
}

// Events
$usuario.addEventListener('focusout', removeErrors);
$contrasenia.addEventListener('focusout', removeErrors);

$form.addEventListener('submit', e => {
    e.preventDefault();

    let hayErrores = false;
    if (!$usuario.value) {
        $usuario.classList.add('border-input-error');
        $usuarioError.classList.remove('hide');
        hayErrores = true;
    }

    if (!$contrasenia.value) {
        $contrasenia.classList.add('border-input-error');
        $contraseniaError.classList.remove('hide');
        hayErrores = true;
    }

    if (hayErrores) {
        return;
    }

    const fd = new FormData();
    fd.append($usuario.id, $usuario.value);
    fd.append($contrasenia.id, $contrasenia.value);
    $buttonText.classList.add('hide');
    $loading.classList.remove('hide');
    fetch('/api/controllers/login.php', {
        method: 'POST',
        body: fd
    })
    .then(response => {
        $buttonText.classList.remove('hide');
        $loading.classList.add('hide');
        $error.textContent = ERROR_MESSAGES[response.status];
        if ($error.textContent) {
            $error.classList.remove('hide');
            return;
        }
        window.location.href = '/dashboard';
    })
})