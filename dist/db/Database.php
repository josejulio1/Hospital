<?php
require_once __DIR__ . '/config/config.php';

class Database {
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