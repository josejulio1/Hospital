<?php
session_start();
if (!$_SESSION) {
    header('Location: /');
}
require_once __DIR__ . '/../api/utils/crud.php';
require_once __DIR__ . '/../db/models/enfermo.php';
require_once __DIR__ . '/../db/models/doctor.php';
require_once __DIR__ . '/../db/models/compania.php';
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
    <script src="../js/components/modal.js" type="module" defer></script>
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
                <img id="search-enfermo-img" src="../img/svg/search.svg" alt="Buscar">
            </article>
            <button class="create" id="nuevo-enfermo" open-modal="modal-enfermo">
                <img src="../img/svg/create.svg" alt="Crear Enfermo">
                <p>Crear</p>
            </button>
            <article class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th class="sort-column" id="sort-dni-enfermo" value="0">
                                <p>DNI</p>
                                <img value="-1" id="sort-dni-enfermo-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                            <th class="sort-column" id="sort-nombre-enfermo" value="1">
                                <p>Nombre</p>
                                <img value="-1" id="sort-nombre-enfermo-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                            <th class="sort-column" id="sort-apellidos-enfermo" value="2">
                                <p>Apellidos</p>
                                <img value="-1" id="sort-apellidos-enfermo-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                            <th class="sort-column" id="sort-dni-doctor-enfermo" value="3">
                                <p>DNI Doctor Asignado</p>
                                <img value="-1" id="sort-dni-doctor-enfermo-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                            <th class="sort-column" id="sort-nombre-compania-enfermo" value="4">
                                <p>Compañía perteneciente</p>
                                <img value="-1" id="sort-nombre-compania-enfermo-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                        </tr>
                    </thead>
                    <tbody id="table-enfermo">
                        <?php
                        $rowsEnfermo = selectAll(enfermo::class);
                        $reflectEnfermo = new ReflectionClass(enfermo::class);
                        $keysEnfermo = array_keys($reflectEnfermo -> getConstants());
                        foreach ($rowsEnfermo as $row) { ?>
                            <tr>
                            <?php
                            foreach ($keysEnfermo as $key) { ?>
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
                        <img src="../img/svg/user.svg" alt="Create Enfermo">
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
                            <div class="list-relative">
                                <input type="text" id="dni-doctor-enfermo" maxlength="9" required>
                                <div class="list hide">
                                    <?php
                                    $rowsDoctor = selectAll(doctor::class);
                                    foreach ($rowsDoctor as $row) { ?>
                                        <article class="list-item lista-doctores-item">
                                            <p class="list-item-important"><?php echo $row['dni'] ?></p>
                                            <p><?php echo $row['nombre'] . ' ' . $row['apellidos']; ?></p>
                                        </article>
                                        <?php
                                    }
                                    ?>
                                </div>
                            </div>
                            <article id="dni-doctor-enfermo-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca un DNI existente de doctor</p>
                            </article>
                        </div>
                        <div class="column">
                            <label for="nombre-compania">Compañía</label>
                            <div class="list-relative">
                                <input type="text" id="nombre-compania" required>
                                <div class="list hide">
                                    <?php
                                    $rowsCompania = selectAll(compania::class);
                                    $reflectCompania = new ReflectionClass(compania::class);
                                    $keysCompania = array_keys($reflectCompania -> getConstants());
                                    foreach ($rowsCompania as $row) { ?>
                                        <article class="list-item lista-companias-item">
                                            <?php
                                            foreach ($keysCompania as $key) { ?>
                                                <p class="list-item-important"><?php echo $row[$key] ?></p>
                                                <?php
                                            } ?>
                                        </article>
                                        <?php
                                    }
                                    ?>
                                </div>
                            </div>
                            <article id="nombre-compania-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca un nombre de compañía existente</p>
                            </article>
                        </div>
                    </div>
                    <div class="row--buttons">
                        <button class="accept" id="accept-enfermo">Aceptar</button>
                        <button class="cancel" id="cancel-enfermo">Cancelar</button>
                    </div>
                </form>
            </section>
        </section>
        <section id="compania" class="hide">
            <article class="search">
                <input type="text" id="search-compania" placeholder="Introduce un texto a buscar">
                <img id="search-compania-img" src="../img/svg/search.svg" alt="Search">
            </article>
            <button class="create" id="nuevo-compania">
                <img src="../img/svg/create.svg" alt="Create">
                <p>Crear</p>
            </button>
            <article class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th id="sort-nombre-compania" value="0">
                                <p>Nombre de la Compañía</p>
                                <img value="-1" id="sort-nombre-compania-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                    </thead>
                    <tbody id="table-compania">
                        <?php
                        $rowsEnfermo = selectAll(compania::class);
                        $reflectEnfermo = new ReflectionClass(compania::class);
                        $keysEnfermo = array_keys($reflectEnfermo -> getConstants());
                        foreach ($rowsEnfermo as $row) { ?>
                            <tr>
                            <?php
                            foreach ($keysEnfermo as $key) { ?>
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
            <section class="modal-container hide" id="modal-compania-container">
                <form class="modal" id="modal-compania">
                    <div class="row--header">
                        <img src="../img/svg/company.svg" alt="Crear Compañía">
                        <h2>Crear Compañía</h2>
                    </div>
                    <div class="row">
                        <div class="column">
                            <label for="nombre-compania">DNI</label>
                            <input type="text" id="nombre-compania" required>
                            <article id="nombre-compania-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca un nombre de Compañía</p>
                            </article>
                        </div>
                    </div>
                    <div class="row--buttons">
                        <button class="accept" id="accept-compania">Aceptar</button>
                        <button class="cancel" id="cancel-compania">Cancelar</button>
                    </div>
                </form>
            </section>
        </section>
        
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