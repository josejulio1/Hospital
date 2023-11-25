// Abrir lista desplegable de opciones al poner focus en input de la lista
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