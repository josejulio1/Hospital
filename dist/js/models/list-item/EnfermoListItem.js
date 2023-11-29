import { ListItem } from "./ListItem.js";

/**
 * Crea un registro de Enfermo para seleccionar más fácil el enfermo en la tabla Consulta
 */
export class EnfermoListItem extends ListItem {
    constructor(dniEnfermo, nombreEnfermo) {
        const listItem = document.createElement('article');
        const dniEnfermoP = document.createElement('p');
        const nombreEnfermoP = document.createElement('p');

        dniEnfermoP.classList.add('list-item-important');
        dniEnfermoP.textContent = dniEnfermo;
        nombreEnfermoP.textContent = nombreEnfermo;
        listItem.classList.add('list-item', 'lista-enfermos-item-consulta');

        listItem.appendChild(dniEnfermoP);
        listItem.appendChild(nombreEnfermoP);
        super(listItem);
    }
}