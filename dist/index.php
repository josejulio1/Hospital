<?php
session_start();
// Si ya tiene una sesión iniciada, devolver al dashboard
if ($_SESSION) {
    header('Location: /dashboard');
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="css/globals.css">
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="css/form-elements.css">
    <link rel="stylesheet" href="css/utils.css">
    <script src="js/auth.js" type="module" defer></script>
</head>
<body>
    <form method="post">
        <h1>Hospital</h1>
        <p id="error" class="hide"></p>
        <section class="row">
            <input type="text" id="usuario" placeholder="Usuario" required>
            <article id="usuario-error" class="input-error hide">
                <img src="img/svg/alert.svg" alt="Alert">
                <p>Debes introducir un usuario</p>
            </article>
        </section>
        <section class="row">
            <input type="password" id="contrasenia" placeholder="Contraseña" required>
            <article id="contrasenia-error" class="input-error hide">
                <img src="img/svg/alert.svg" alt="Alert">
                <p>Debes introducir una contraseña</p>
            </article>
        </section>
        <button id="enviar" type="submit">
            <p id="button-text">Iniciar Sesión</p>
            <img id="loading" class="hide" src="img/svg/loading.svg" alt="Loading">
        </button>
    </form>
</body>
</html>