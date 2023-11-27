import { isNumber } from "../utils/checkers.js";

document.querySelectorAll('.sort-column').forEach(column => {
    column.addEventListener('click', sortEvent);
})

function sortEvent(e) {
    const target = e.target;
    const tableBody = target.parentNode.parentNode.nextElementSibling;
    const $sortType = document.getElementById(`${target.id}-type`);
    const actualValue = -parseInt($sortType.getAttribute('value'));
    sortColumn(tableBody, parseInt(target.getAttribute('value')), actualValue);
    $sortType.setAttribute('value', actualValue);
    $sortType.classList.toggle('rotate-180deg');
}

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