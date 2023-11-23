<?php
require_once __DIR__ . '/../utils/http-status-codes.php';
session_start();
$_SESSION = [];
session_destroy();
return http_response_code(OK);
?>