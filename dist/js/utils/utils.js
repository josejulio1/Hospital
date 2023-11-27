/**
 * Elimina los mensajes de error de los input, para que en caso de que se haya logrado enviar
 * el formulario sin información (eliminando el required), y el usuario vuelva a escribir en
 * los campos, se elimine el error al quitar el foco en caso de que haya texto en los input
 * @param {Event} e Elemento que accionó el evento
 */
export function removeErrors(e) {
    const target = e.target;
    // Comprobar si el campo de texto contiene información, para quitar los mensajes de error
    if (target.value) {
        target.classList.remove('border-input-error');
        document.getElementById(`${target.id}-error`).classList.add('hide');
    }
}