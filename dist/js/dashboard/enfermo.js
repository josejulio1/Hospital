const $searchEnfermoSelect = document.getElementById('search-enfermo-select');
export const $searchEnfermo = document.getElementById('search-enfermo');
const $searchEnfermoImg = document.getElementById('search-enfermo-img');
export const $tableEnfermo = document.getElementById('table-enfermo');
export let tablaEnfermoContent;

// Sorting
/* const $sortDniEnfermo = document.getElementById('sort-dni-enfermo');
const $sortNombreEnfermo = document.getElementById('sort-nombre-enfermo');
const $sortApellidosEnfermo = document.getElementById('sort-apellidos-enfermo');
const $sortDniDoctorEnfermo = document.getElementById('sort-dni-doctor-enfermo');
const $sortNombreCompaniaEnfermo = document.getElementById('sort-nombre-compania-enfermo'); */

// Events
window.addEventListener('load', () => {
    tablaEnfermoContent = $tableEnfermo.innerHTML;
})

$searchEnfermoSelect.addEventListener('change', () => {
    search($searchEnfermoSelect.value, $searchEnfermo.value);
})

$searchEnfermo.addEventListener('keyup', () => {
    if (!$searchEnfermo.value) {
        $tableEnfermo.innerHTML = tablaEnfermoContent;
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

/* $sortDniEnfermo.addEventListener('click', sortEvent);
$sortNombreEnfermo.addEventListener('click', sortEvent);
$sortApellidosEnfermo.addEventListener('click', sortEvent);
$sortDniDoctorEnfermo.addEventListener('click', sortEvent);
$sortNombreCompaniaEnfermo.addEventListener('click', sortEvent); */

// Functions
function search(column, text) {
    $tableEnfermo.innerHTML = tablaEnfermoContent;
    let searchedContent = document.createElement('tbody');
    const $rows = $tableEnfermo.children;
    for (const row of $rows) {
        if (row.children[parseInt(column)].textContent.includes(text)) {
            searchedContent.appendChild(row);
        }
    }
    $tableEnfermo.innerHTML = searchedContent.innerHTML;
}

/**
 * Esta función es necesaria para poder cambiar las filas de la tabla desde otro módulo, ya que no se
 * puede cambiar el valor de la variable original cuando esta es exportada
 */
export function changeOldTableEnfermoContent(content) {
    tablaEnfermoContent = content;
}

export function changeTableEnfermoContent(content) {
    $tableEnfermo.innerHTML = content;
}