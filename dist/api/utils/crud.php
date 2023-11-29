<?php
require_once __DIR__ . '/http-status-codes.php';
require_once __DIR__ . '/../../db/Database.php';

/**
 * Selecciona todas las columnas de una tabla pasada por enum
 * @param $enum Clase enum de la que coger el nombre de la tabla
 */
function selectAll($enum) {
    $db = Database::connect();
    if (!$db) {
        return http_response_code(SERVICE_UNAVAILABLE);
    }
    $reflect = new ReflectionClass($enum);
    $statement = $db -> query('SELECT * FROM ' . $reflect -> name);
    $rows = [];
    while ($result = $statement -> fetch_assoc()) {
        $rows[] = $result;
    }
    $db -> close();
    return $rows;
}

/**
 * Inserta un nuevo registro en una de las tablas
 * @param $enum Clase enum para recoger información de las columnas de la tabla
 * @param array $arrayData Array del que se recogen los datos enviados para ser insertados 
 */
function insert($enum, array $arrayData) {
    $db = Database::connect();
    if (!$db) {
        return http_response_code(SERVICE_UNAVAILABLE);
    }
    $reflect = new ReflectionClass($enum);
    $sentence = 'INSERT INTO ' . $reflect -> name . ' (';
    $properties = array_keys($reflect -> getConstants());
    $preparedValues = '';
    foreach ($properties as $property) {
        $sentence .= "$property,";
        $preparedValues .= '?,';
    }
    $preparedValues = substr($preparedValues, 0, strlen($preparedValues) - 1);
    $sentence = substr($sentence, 0, strlen($sentence) - 1) . ") VALUES ($preparedValues)";
    $statement = $db -> prepare($sentence);
    $result = '';
    try {
        $statement -> execute(array_values($arrayData));
        $result = OK;
    } catch (mysqli_sql_exception $e) {
        $result = CONFLICT;
    }
    $db -> close();
    return $result;
}
/**
 * Actualiza exclusivamente un registro de la tabla Medicamento
 * @param $id ID de la fila a actualizar
 * @param array $fields Array asociativo de nombre de columna y valor al que se quiere actualizar
 */
function updateMedicine($id, array $fields) {
    $db = Database::connect();
    if (!$db) {
        return http_response_code(SERVICE_UNAVAILABLE);
    }
    $sentence = 'UPDATE ' . medicamento::class . ' SET ';
    $fieldsKeys = array_keys($fields);
    $preparedValues = [];
    $i = 0;
    foreach ($fields as $field) {
        $sentence .= $fieldsKeys[$i++] . " = ?,";
        $preparedValues[] = $field;
    }
    $preparedValues[] = $id;
    $sentence = substr($sentence, 0, strlen($sentence) - 1) . ' WHERE id = ?';
    $statement = $db -> prepare($sentence);
    $result = '';
    try {
        $statement -> execute($preparedValues);
        $result = OK;
    } catch (mysqli_sql_exception $e) {
        $result = CONFLICT;
    }
    $db -> close();
    return $result;
}
?>