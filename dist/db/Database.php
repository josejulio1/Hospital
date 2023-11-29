<?php
require_once __DIR__ . '/config/config.php';

/**
 * Clase utilizada para conectarse a la base de datos.
 */
class Database {
    /**
     * Permite conectarse a la base de datos. Si se conecta, devuelve una instancia de la base de datos.
     * En caso de que no, devolverá false.
     */
    public static function connect() {
        try {
            $db = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
            return $db;
        } catch (mysqli_sql_exception $e) {
            return false;
        }
    }
}
?>