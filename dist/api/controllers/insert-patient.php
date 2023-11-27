<?php
require_once __DIR__ . '/../utils/http-status-codes.php';
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    echo '<p>Acceso no autorizado</p>';
    return http_response_code(METHOD_NOT_ALLOWED);
}
session_start();
if (!$_SESSION) {
    return http_response_code(METHOD_NOT_ALLOWED);
}

// Volver a validar los datos
require_once '../utils/checkers.php';
$formValues = array_values($_POST);
foreach ($formValues as $formValue) {
    if (!$formValue) {
        return http_response_code(NOT_FOUND);
    }
}
$dni = $formValues[0];
if (strlen($dni) != 9 || !checkDni($dni)) {
    return http_response_code(NOT_FOUND);
}
$dniDoctor = $formValues[3];
if (strlen($dniDoctor) != 9 || !checkDni($dniDoctor)) {
    return http_response_code(NOT_FOUND);
}

require_once __DIR__ . '/../../db/Database.php';
require_once __DIR__ . '/../../db/models/enfermo.php';
require_once __DIR__ . '/../utils/crud.php';
return http_response_code(insert(enfermo::class, $_POST));
?>