import { isNumber } from "../utils/checkers.js";

document.querySelectorAll('.sort-column').forEach(column => {
    column.addEventListener('click', sortEvent);
})

/**
 * Coge el identificador de la columna de una tabla que accionó el evento para cambiar su valor a
 * ascendete/descendente y cambiar el orden de la columna
 * @param {Event} e Elemento que accionó el evento
 */
function sortEvent(e) {
    const target = e.target;
    const tableBody = target.parentNode.parentNode.nextElementSibling;
    const $sortType = document.getElementById(`${target.id}-type`);
    const actualValue = -parseInt($sortType.getAttribute('value'));
    sortColumn(tableBody, parseInt(target.getAttribute('value')), actualValue);
    $sortType.setAttribute('value', actualValue);
    $sortType.classList.toggle('rotate-180deg');
}

/**
 * Ordena una columna de una tabla cualquiera
 * @param {HTMLElement} tableElement Tabla a la que cambiar el orden de la columna
 * @param {Number} column Número de columna a la que ordenar
 * @param {Number} order Tipo de orden a la que ordenar. -1 si es ascendente y 1 si es descendente
 */
export function sortColumn(tableElement, column, order) {
    const $rows = [...document.querySelectorAll(`#${tableElement.id} tr`)];
    if ($rows.length == 0) {
        return;
    }
    // Si es un número, ordenar como número y no como string
    if (isNumber.test($rows[0].children[column].textContent)) {
        $rows.sort((a, b) => parseFloat(a.children[column].textContent) < parseFloat(b.children[column].textContent) ? order : -order);
    } else {
        $rows.sort((a, b) => a.children[column].textContent < b.children[column].textContent ? order : -order);
    }
    tableElement.innerHTML = '';
    $rows.forEach(row => tableElement.appendChild(row));
}