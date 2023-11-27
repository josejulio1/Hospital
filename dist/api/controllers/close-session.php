<?php
require_once __DIR__ . '/../utils/http-status-codes.php';
session_start();
if (!$_SESSION) {
    return http_response_code(METHOD_NOT_ALLOWED);
}
$_SESSION = [];
session_destroy();
return http_response_code(OK);
?>