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
$formValues = array_values($_POST);
foreach ($formValues as $formValue) {
    if (!$formValue) {
        return http_response_code(NOT_FOUND);
    }
}
require_once '../utils/checkers.php';
$precio = $formValues[1];
if (!preg_match($isNumber, $precio)) {
    return http_response_code(NOT_FOUND);
}
$fechaCaducidad = $formValues[2];
if (!preg_match($isDate, $fechaCaducidad)) {
    return http_response_code(NOT_FOUND);
}

require_once __DIR__ . '/../../db/Database.php';
require_once __DIR__ . '/../../db/models/medicamento_no_id.php';
require_once __DIR__ . '/../utils/crud.php';
return http_response_code(insert(medicamento::class, $_POST));
?>