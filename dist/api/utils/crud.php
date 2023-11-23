<?php
require_once __DIR__ . '/http-status-codes.php';
require_once __DIR__ . '/../../db/Database.php';

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

function insert($enum, $arrayData) {
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

/* function searchBySurname($searchedSurname) {
    $db = Database::connect();
    if (!$db) {
        return http_response_code(SERVICE_UNAVAILABLE);
    }
    $statement = $db -> prepare('SELECT * FROM v_enfermo_nombre_compania WHERE apellidos = ?');
    $statement -> bind_param('s', $searchedSurname);
    $statement -> execute();
    $result = $statement -> get_result();
    $rows = [];
    while ($row = $result -> fetch_assoc()) {
        $rows[] = $row;
    }
    $db -> close();
    return $rows;
} */
?>