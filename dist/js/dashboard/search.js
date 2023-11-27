export function search(tableElement, tableContent, column, text) {
    tableElement.innerHTML = tableContent;
    let searchedContent = document.createElement('tbody');
    const $rows = tableElement.children;
    for (const row of $rows) {
        if (row.children[parseInt(column)].textContent.startsWith(text)) {
            searchedContent.appendChild(row);
        }
    }
    tableElement.innerHTML = searchedContent.innerHTML;
}