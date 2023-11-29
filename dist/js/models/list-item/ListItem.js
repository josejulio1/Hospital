/**
 * Actúa de clase padre para guardar en común un item de lista de cualquier tipo que se cree
 */
export class ListItem {
    constructor(listItem) {
        this.listItem = listItem;
    }

    getListItem() {
        return this.listItem;
    }
}