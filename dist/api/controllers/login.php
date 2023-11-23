<?php
require_once __DIR__ . '/../utils/http-status-codes.php';
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    return http_response_code(METHOD_NOT_ALLOWED);
}

// Volver a validar los datos
$formValues = array_values($_POST);
foreach ($formValues as $formValue) {
    if (!$formValue) {
        return http_response_code(NOT_FOUND);
    }
}

require_once __DIR__ . '/../../db/Database.php';
$db = Database::connect();
if (!$db) {
    return http_response_code(SERVICE_UNAVAILABLE);
}
$statement = $db -> prepare("SELECT * FROM usuario WHERE usuario = ?");
$statement -> bind_param('s', $_POST['usuario']);
$statement -> execute();
$result = $statement -> get_result();
if ($result -> num_rows == 0) {
    return http_response_code(NOT_FOUND);
}
$queryResult = $result -> fetch_assoc();
if (!password_verify($_POST['contrasenia'], $queryResult['contrasenia'])) {
    return http_response_code(NOT_FOUND);
}
session_start();
$_SESSION['id'] = session_id();
$_SESSION['usuario'] = $queryResult['usuario'];
return http_response_code(OK);
?>