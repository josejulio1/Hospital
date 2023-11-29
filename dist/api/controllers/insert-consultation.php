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
    if (!$formValue || preg_match($isHtmlTag, $formValue)) {
        return http_response_code(NOT_FOUND);
    }
}
$dniEnfermo = $formValues[0];
if (!checkDni($dniEnfermo)) {
    return http_response_code(NOT_FOUND);
}
$dniDoctor = $formValues[1];
if (!checkDni($dniDoctor)) {
    return http_response_code(NOT_FOUND);
}
$numSala = $formValues[2];
if (!preg_match($isNumber, $numSala)) {
    return http_response_code(NOT_FOUND);
}
$fechaConsulta = $formValues[3];
if (!preg_match($isDate, $fechaConsulta)) {
    return http_response_code(NOT_FOUND);
}
if (isset($idMedicamento)) {
    $idMedicamento = $formValues[4];
    if (!preg_match($isNumber, $idMedicamento)) {
        return http_response_code(NOT_FOUND);
    }
}
require_once __DIR__ . '/../../db/Database.php';
require_once __DIR__ . '/../../db/models/consulta_no_id_medicamento.php';
require_once __DIR__ . '/../utils/crud.php';
// TODO: Arreglar consulta
return http_response_code(insert(consulta::class, $_POST));
?>