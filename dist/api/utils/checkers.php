<?php
function checkDni($dni) {
    $letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
    return $letras[intval(substr($dni, 0, strlen($dni) - 1)) % 23] == $dni[strlen($dni) - 1];
}

// Regex
$isHtmlTag = '/<.*|>/';
$isNumber = '/(^[0-9]{1,}$)|(^[0-9]{1,}\.[0-9]{1,2}$)/';
$isDate = '/^[0-9]{4}+\-([0-9]|1[012])+\-([0-2][0-9]|3[01])$/';
?>