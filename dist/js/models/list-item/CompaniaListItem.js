import { ListItem } from "./ListItem.js";

/**
 * Crea un registro de Compañía para seleccionar más fácil la compañía en la tabla Enfermo
 */
export class CompaniaListItem extends ListItem {
    constructor(nombreCompania) {
        const listItem = document.createElement('article');
        const nombreCompaniaP = document.createElement('p');

        nombreCompaniaP.classList.add('list-item-important');
        nombreCompaniaP.textContent = nombreCompania;
        listItem.classList.add('list-item', 'lista-enfermos-item-consulta');

        listItem.appendChild(nombreCompaniaP);
        super(listItem);
    }
}