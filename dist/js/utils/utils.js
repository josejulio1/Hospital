/**
 * Elimina los mensajes de error de los input, para que en caso de que se haya logrado enviar
 * el formulario sin información (eliminando el required), y el usuario vuelva a escribir en
 * los campos, se elimine el error al quitar el foco en caso de que haya texto en los input
 * @param {Event} e 
 */
export function removeErrors(e) {
    const target = e.target;
    // Comprobar si el campo de texto contiene información, para quitar los mensajes de error
    if (target.value) {
        document.getElementById(target.id).classList.remove('border-input-error');
        document.getElementById(`${target.id}-error`).classList.add('hide');
    }
}

export const ERROR_MESSAGES = {
    404: 'Usuario o contraseña incorrectos',
    409: 'El registro no se pudo crear correctamente. Ya existe en la base de datos',
    503: 'No se pudo conectar a la base de datos. Inténtelo más tarde'
}