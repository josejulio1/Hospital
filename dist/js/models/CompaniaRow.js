export class CompaniaRow {
    constructor(nombre) {
        this.row = document.createElement('tr');
        const nombreTd = document.createElement('td');

        nombreTd.textContent = nombre;

        this.row.appendChild(nombreTd);
    }

    getRow() {
        return this.row;
    }
}