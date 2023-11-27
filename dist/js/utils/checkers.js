/**
 * Comprueba si la letra de un DNI introducido se corresponde con dicho DNI o no
 * @param {string} dni 
 * @returns Si el número coincide con la letra, devolverá un true, sino, false
 */
export function checkDni(dni) {
    const letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
    return letras[parseInt(dni.substring(0, dni.length - 1)) % 23] == dni.charAt(dni.length - 1);
}

// Regex
export const noXSS = new RegExp(/<script>*.*<\/script>/);
// TODO: Controlar XSS
export const dniRegex = new RegExp(/^[0-9]{8}[a-zA-Z]$/);
export const isNumber = new RegExp(/(^[0-9]{1,}$)|(^[1-9]{1,}\.[0-9]{1,2}$)/);
export const isDate = new RegExp(/^[0-9]{4}\-([0-9]|1[012])\-([0-2][0-9]|3[01])$/);