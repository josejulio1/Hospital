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
$precio = $formValues[2];
if (!preg_match($isNumber, $precio)) {
    return http_response_code(NOT_FOUND);
}

require_once __DIR__ . '/../../db/Database.php';
require_once __DIR__ . '/../../db/models/medicamento.php';
require_once __DIR__ . '/../utils/crud.php';
return http_response_code(updateMedicine(medicamento::class, $_POST['id'], [
    'nombre' => $_POST['nombre-medicamento-actualizar'],
    'precio' => $_POST['precio-medicamento-actualizar']
]));
?>