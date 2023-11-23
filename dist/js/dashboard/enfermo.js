const $searchEnfermoSelect = document.getElementById('search-enfermo-select');
const $searchEnfermo = document.getElementById('search-enfermo');
const $searchEnfermoImg = document.getElementById('search-enfermo-img');
export const $tableEnfermo = document.getElementById('table-enfermo');
let oldContent;

// Sorting
const $sortDniEnfermo = document.getElementById('sort-dni-enfermo');
const $sortNombreEnfermo = document.getElementById('sort-nombre-enfermo');
const $sortApellidosEnfermo = document.getElementById('sort-apellidos-enfermo');
const $sortDniDoctorEnfermo = document.getElementById('sort-dni-doctor-enfermo');
const $sortNombreCompaniaEnfermo = document.getElementById('sort-nombre-compania-enfermo');

// Events
window.addEventListener('load', () => {
    oldContent = $tableEnfermo.innerHTML;
})

$searchEnfermoSelect.addEventListener('change', () => {
    search($searchEnfermoSelect.value, $searchEnfermo.value);
})

$searchEnfermo.addEventListener('keyup', () => {
    if (!$searchEnfermo.value) {
        $tableEnfermo.innerHTML = oldContent;
    }
})

$searchEnfermo.addEventListener('keyup', e => {
    if ($searchEnfermo.value) {
        search($searchEnfermoSelect.value, $searchEnfermo.value);
    }
})

$searchEnfermoImg.addEventListener('click', () => {
    search($searchEnfermoSelect.value, $searchEnfermo.value);
});

$sortDniEnfermo.addEventListener('click', sortEvent);
$sortNombreEnfermo.addEventListener('click', sortEvent);
$sortApellidosEnfermo.addEventListener('click', sortEvent);
$sortDniDoctorEnfermo.addEventListener('click', sortEvent);
$sortNombreCompaniaEnfermo.addEventListener('click', sortEvent);

// Functions
function search(column, text) {
    $tableEnfermo.innerHTML = oldContent;
    let searchedContent = document.createElement('tbody');
    const $rows = $tableEnfermo.children;
    for (const row of $rows) {
        if (row.children[parseInt(column)].textContent.includes(text)) {
            searchedContent.appendChild(row);
        }
    }
    $tableEnfermo.innerHTML = searchedContent.innerHTML;
}

function sortEvent(e) {
    const target = e.target;
    const $sortType = document.getElementById(`${target.id}-type`);
    const actualValue = -parseInt($sortType.getAttribute('value'));
    sortColumn(parseInt(target.getAttribute('value')), actualValue);
    $sortType.setAttribute('value', actualValue);
    $sortType.classList.toggle('sorted-desc');
}

export function sortColumn(column, order) {
    const $rows = [...document.querySelectorAll('#table-enfermo tr')];
    $rows.sort((a, b) => a.children[column].textContent < b.children[column].textContent ? order : -order);
    $tableEnfermo.innerHTML = '';
    $rows.forEach(row => $tableEnfermo.appendChild(row));
}