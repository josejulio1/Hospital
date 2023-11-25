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
    $sortType.classList.toggle('sorted-desc');
}

export function sortColumn(tableElement, column, order) {
    const $rows = [...document.querySelectorAll(`#${tableElement.id} tr`)];
    $rows.sort((a, b) => a.children[column].textContent < b.children[column].textContent ? order : -order);
    tableElement.innerHTML = '';
    $rows.forEach(row => tableElement.appendChild(row));
}