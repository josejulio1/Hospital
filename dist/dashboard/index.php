<?php
require_once __DIR__ . '/../api/utils/crud.php';
session_start();
if (!$_SESSION) {
    header('Location: /');
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin</title>
    <link rel="stylesheet" href="../css/globals.css">
    <link rel="stylesheet" href="../css/admin.css">
    <link rel="stylesheet" href="../css/form-elements.css">
    <link rel="stylesheet" href="../css/modal.css">
    <link rel="stylesheet" href="../css/utils.css">
    <script src="../js/dashboard/enfermo.js" type="module" defer></script>
    <script src="../js/components/panel.js" defer></script>
    <script src="../js/components/modal-info.js" type="module" defer></script>
    <script src="../js/components/modal-enfermo.js" type="module" defer></script>
</head>
<body>
    <aside class="left">
        <section class="info-account">
            <p><?php echo $_SESSION['usuario']; ?></p>
        </section>
        <section class="options">
            <button id="ir-enfermo" class="option selected-option">
                <img src="../img/svg/user.svg" alt="Enfermo">
                <p>Enfermos</p>
            </button>
            <button id="ir-compania" class="option">
                <img src="../img/svg/company.svg" alt="Compañía">
                <p>Compañías</p>
            </button>
            <button id="ir-medicamento" class="option">
                <img src="../img/svg/pill.svg" alt="Medicamento">
                <p>Medicamentos</p>
            </button>
            <button id="ir-consulta" class="option">
                <img src="../img/svg/consultation.svg" alt="Consulta">
                <p>Consultas</p>
            </button>
        </section>
        <section class="close-session">
            <img src="../img/svg/close-session.svg" alt="Cerrar Sesión">
            <button>Cerrar Sesión</button>
        </section>
    </aside>
    <main class="right">
        <section id="enfermo">
            <article class="search">
                <select id="search-enfermo-select">
                    <option value="0" selected>DNI</option>
                    <option value="1">Nombre</option>
                    <option value="2">Apellidos</option>
                    <option value="3">DNI Doctor Asignado</option>
                    <option value="4">Compañía perteneciente</option>
                </select>
                <input type="text" id="search-enfermo" placeholder="Introduce un texto a buscar">
                <img id="search-enfermo-img" src="../img/svg/search.svg" alt="Search">
            </article>
            <button class="create" id="nuevo-enfermo">
                <img src="../img/svg/create.svg" alt="Create">
                <p>Crear</p>
            </button>
            <article class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th id="sort-dni-enfermo" value="0">
                                <p>DNI</p>
                                <img value="-1" id="sort-dni-enfermo-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                            <th id="sort-nombre-enfermo" value="1">
                                <p>Nombre</p>
                                <img value="-1" id="sort-nombre-enfermo-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                            <th id="sort-apellidos-enfermo" value="2">
                                <p>Apellidos</p>
                                <img value="-1" id="sort-apellidos-enfermo-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                            <th id="sort-dni-doctor-enfermo" value="3">
                                <p>DNI Doctor Asignado</p>
                                <img value="-1" id="sort-dni-doctor-enfermo-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                            <th id="sort-nombre-compania-enfermo" value="4">
                                <p>Compañía perteneciente</p>
                                <img value="-1" id="sort-nombre-compania-enfermo-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                        </tr>
                    </thead>
                    <tbody id="table-enfermo">
                        <?php
                        require_once __DIR__ . '/../db/models/v_enfermo_nombre_compania.php';
    
                        $rows = selectAll(v_enfermo_nombre_compania::class);
                        $reflect = new ReflectionClass(v_enfermo_nombre_compania::class);
                        $keys = array_keys($reflect -> getConstants());
                        foreach ($rows as $row) { ?>
                            <tr>
                            <?php
                            foreach ($keys as $key) { ?>
                                    <td><?php echo $row[$key]; ?></td>
                                    <?php
                            } ?>
                            </tr>
                            <?php
                        }
                        ?>
                    </tbody>
                </table>
            </article>
            <section class="modal-container hide" id="modal-enfermo-container">
                <form class="modal" id="modal-enfermo">
                    <div class="row--header">
                        <img src="../img/svg/user.svg" alt="Create">
                        <h2>Crear Enfermo</h2>
                    </div>
                    <div class="row">
                        <div class="column">
                            <label for="dni-enfermo">DNI</label>
                            <div class="dni-container">
                                <input type="text" id="dni-enfermo" maxlength="9" required>
                                <img id="dni-correcto" class="hide" src="../img/svg/green-tic.svg" alt="Correct">
                                <img id="dni-incorrecto" class="hide" src="../img/svg/error.svg" alt="Incorrect">
                            </div>
                            <article id="dni-enfermo-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca un DNI. Formato (12345678A)</p>
                            </article>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column">
                            <label for="nombre-enfermo">Nombre</label>
                            <input type="text" id="nombre-enfermo" required>
                            <article id="nombre-enfermo-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca el nombre del enfermo</p>
                            </article>
                        </div>
                        <div class="column">
                            <label for="apellidos-enfermo">Apellidos</label>
                            <input type="text" id="apellidos-enfermo" required>
                            <article id="apellidos-enfermo-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca los apellidos del enfermo</p>
                            </article>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column">
                            <label for="dni-doctor-enfermo">DNI Doctor Asignado</label>
                            <input list="doctores" id="dni-doctor-enfermo" required>
                            <article id="dni-doctor-enfermo-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca un DNI existente de doctor</p>
                            </article>
                        </div>
                        <datalist id="doctores">
                        <?php
                        require_once __DIR__ . '/../db/models/doctor.php';
                        $rows = selectAll(doctor::class);
                        $reflect = new ReflectionClass(doctor::class);
                        $keys = array_keys($reflect -> getConstants());
                        foreach ($rows as $row) { ?>
                            <tr>
                                <option value="<?php echo $row[$keys[0]]?>"><?php echo $row[$keys[1]] . ' ' . $row[$keys[2]]; ?></option>
                            </tr>
                            <?php
                        }
                        ?>
                        </datalist>
                        <div class="column">
                            <label for="nombre-compania">Compañía</label>
                            <input list="companias" id="nombre-compania" required>
                            <article id="nombre-compania-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca un nombre de compañía existente</p>
                            </article>
                        </div>
                        <datalist id="companias">
                        <?php
                        require_once __DIR__ . '/../db/models/compania.php';
                        $rows = selectAll(compania::class);
                        $reflect = new ReflectionClass(compania::class);
                        $keys = array_keys($reflect -> getConstants());
                        foreach ($rows as $row) { ?>
                            <tr>
                                <option value="<?php echo $row[$keys[0]]; ?>"></option>
                            </tr>
                            <?php
                        }
                        ?>
                        </datalist>
                    </div>
                    <div class="row--buttons">
                        <button class="accept" id="accept-enfermo">Aceptar</button>
                        <button class="cancel" id="cancel-enfermo">Cancelar</button>
                    </div>
                </form>
            </section>
        </section>
        <section id="compania" class="hide"></section>
        <section id="medicamento" class="hide"></section>
        <section id="consulta" class="hide"></section>
        <section class="modal-container hide" id="modal-info-container">
            <article class="modal modal-info" id="modal-info">
                <img id="modal-info-correcto" class="hide" src="../img/svg/green-tic.svg" alt="Correcto">
                <img id="modal-info-incorrecto" class="hide" src="../img/svg/error.svg" alt="Incorrecto">
                <p id="modal-info-mensaje"></p>
                <button class="btn-accept" id="cancel-modal-info">Aceptar</button>
            </article>
        </section>
    </main>
</body>
</html>