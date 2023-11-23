<?php
$db = mysqli_connect('localhost', 'root', '', 'hospital');
mysqli_query($db, "INSERT INTO usuario VALUES ('jose', '" . password_hash('1234', PASSWORD_DEFAULT) . "')");
?>