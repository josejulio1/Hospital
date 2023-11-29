import { ListItem } from "./ListItem.js";

/**
 * Crea un registro de Doctor para seleccionar más fácil el doctor en la tabla Enfermo y en la Consulta
 */
export class DoctorListItem extends ListItem {
    constructor(dniDoctor, nombreApellidosDoctor) {
        const listItem = document.createElement('article');
        const dniDoctorP = document.createElement('p');
        const nombreApellidosDoctorP = document.createElement('p');

        dniDoctorP.classList.add('list-item-important');
        dniDoctorP.textContent = dniDoctor;
        nombreApellidosDoctorP.textContent = nombreApellidosDoctor;
        listItem.classList.add('list-item', 'lista-doctores-item-consulta');

        listItem.appendChild(dniDoctorP);
        listItem.appendChild(nombreApellidosDoctorP);
        super(listItem);
    }
}