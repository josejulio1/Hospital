import { ListItem } from "./ListItem.js";

/**
 * Crea un registro de Medicamento para seleccionar más fácil el medicamento en la tabla Consulta
 */
export class MedicamentoListItem extends ListItem {
    constructor(idMedicamento, nombreMedicamento, precioMedicamento, fechaCaducidadMedicamento) {
        const listItem = document.createElement('article');
        const idMedicamentoP = document.createElement('p');
        const nombreMedicamentoP = document.createElement('p');
        const precioMedicamentoP = document.createElement('p');
        const fechaCaducidadMedicamentoP = document.createElement('p');

        idMedicamentoP.classList.add('list-item-important');
        idMedicamentoP.textContent = idMedicamento;
        nombreMedicamentoP.textContent = nombreMedicamento;
        precioMedicamentoP.textContent = precioMedicamento;
        fechaCaducidadMedicamentoP.textContent = fechaCaducidadMedicamento;
        listItem.classList.add('list-item', 'lista-enfermos-item-consulta');

        listItem.appendChild(idMedicamentoP);
        listItem.appendChild(nombreMedicamentoP);
        listItem.appendChild(precioMedicamentoP);
        listItem.appendChild(fechaCaducidadMedicamentoP);
        super(listItem);
    }
}