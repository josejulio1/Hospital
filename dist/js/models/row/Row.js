/**
 * Actúa de clase padre para guardar en común la fila de cualquier tabla que se cree
 */
export class Row {
    constructor(row) {
        this.row = row;
    }

    getRow() {
        return this.row;
    }
}