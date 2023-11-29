/**
 * Busca un texto en su respectiva tabla
 * @param {HTMLElement} tableElement Tabla en la que buscar la información
 * @param {String} tableContent Variable donde se almacena el contenido antiguo de la tabla para volverla a poner sin filtros
 * (para que cuando se quite la búsqueda, la tabla vuelva a tener los registros que tenía antes de la búsqueda)
 * @param {String} column Número de columna en la que se buscará el texto introducido
 * @param {String} text Texto a buscar en la tabla
 */
export function search(tableElement, tableContent, column, text) {
    tableElement.innerHTML = tableContent;
    let $rows = [...tableElement.children];
    $rows = $rows.filter(row => row.children[parseInt(column)].textContent.startsWith(text));
    tableElement.innerHTML = '';
    $rows.forEach(row => tableElement.appendChild(row));
}