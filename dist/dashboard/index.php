<?php
session_start();
if (!$_SESSION) {
    header('Location: /');
}
require_once __DIR__ . '/../api/utils/crud.php';
require_once __DIR__ . '/../db/models/enfermo.php';
require_once __DIR__ . '/../db/models/compania.php';
require_once __DIR__ . '/../db/models/medicamento.php';
require_once __DIR__ . '/../db/models/doctor.php';
require_once __DIR__ . '/../db/models/v_consulta_medicamento.php';
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
    <script src="../js/dashboard/sort.js" type="module" defer></script>
    <script src="../js/components/panel.js" defer></script>
    <script src="../js/dashboard/enfermo.js" type="module" defer></script>
    <script src="../js/dashboard/doctor.js" type="module" defer></script>
    <script src="../js/dashboard/compania.js" type="module" defer></script>
    <script src="../js/dashboard/medicamento.js" type="module" defer></script>
    <script src="../js/dashboard/consulta.js" type="module" defer></script>
    <script src="../js/components/modal.js" type="module" defer></script>
    <script src="../js/components/modal-info.js" type="module" defer></script>
    <script src="../js/components/modal-enfermo.js" type="module" defer></script>
    <script src="../js/components/modal-doctor.js" type="module" defer></script>
    <script src="../js/components/modal-compania.js" type="module" defer></script>
    <script src="../js/components/modal-medicamento.js" type="module" defer></script>
    <script src="../js/components/modal-consulta.js" type="module" defer></script>
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
            <button id="ir-doctor" class="option">
                <img src="../img/svg/doctor.svg" alt="Doctor">
                <p>Doctores</p>
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
            <button class="create" id="nuevo-enfermo">
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
                        $keysConsultaMedicamento = array_keys($reflectEnfermo -> getConstants());
                        foreach ($rowsEnfermo as $row) { ?>
                            <tr>
                            <?php
                            foreach ($keysConsultaMedicamento as $key) { ?>
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
                <form class="modal">
                    <div class="row--header">
                        <img src="../img/svg/user.svg" alt="Crear Enfermo">
                        <h2>Crear Enfermo</h2>
                    </div>
                    <div class="row">
                        <div class="column">
                            <label for="dni-enfermo">DNI</label>
                            <div class="dni-container">
                                <input type="text" class="input-form" id="dni-enfermo" maxlength="9" required>
                                <img id="dni-enfermo-correcto" class="hide" src="../img/svg/green-tic.svg" alt="Correct">
                                <img id="dni-enfermo-incorrecto" class="hide" src="../img/svg/error.svg" alt="Incorrect">
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
                            <input type="text" class="input-form" id="nombre-enfermo" required>
                            <article id="nombre-enfermo-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca el nombre del enfermo</p>
                            </article>
                        </div>
                        <div class="column">
                            <label for="apellidos-enfermo">Apellidos</label>
                            <input type="text" class="input-form" id="apellidos-enfermo" required>
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
                                <input type="text" class="input-form" id="dni-doctor-enfermo" maxlength="9" required>
                                <div class="list hide" id="lista-doctores-enfermo">
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
                                <input type="text" class="input-form" id="nombre-compania" required>
                                <div class="list hide" id="lista-companias-enfermo">
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
                        <button class="cancel">Cancelar</button>
                    </div>
                </form>
            </section>
        </section>
        <section id="compania" class="hide">
            <article class="search">
                <input type="text" id="search-compania" placeholder="Introduce un nombre de compañía a buscar">
                <img id="search-compania-img" src="../img/svg/search.svg" alt="Search">
            </article>
            <button class="create" id="nuevo-compania">
                <img src="../img/svg/create.svg" alt="Crear Compañía">
                <p>Crear</p>
            </button>
            <article class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th class="sort-column" id="sort-nombre-compania" value="0">
                                <p>Nombre de la Compañía</p>
                                <img value="-1" id="sort-nombre-compania-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                        </tr>
                    </thead>
                    <tbody id="table-compania">
                        <?php
                        foreach ($rowsCompania as $row) { ?>
                            <tr>
                            <?php
                            foreach ($keysCompania as $key) { ?>
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
                <form class="modal">
                    <div class="row--header">
                        <img src="../img/svg/company.svg" alt="Crear Compañía">
                        <h2>Crear Compañía</h2>
                    </div>
                    <div class="row">
                        <div class="column">
                            <label for="nombre-compania-compania">Nombre de la Compañía</label>
                            <input type="text" class="input-form" id="nombre-compania-compania" required>
                            <article id="nombre-compania-compania-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca un nombre de Compañía</p>
                            </article>
                        </div>
                    </div>
                    <div class="row--buttons">
                        <button class="accept" id="accept-compania">Aceptar</button>
                        <button class="cancel">Cancelar</button>
                    </div>
                </form>
            </section>
        </section>
        <section id="medicamento" class="hide">
            <article class="search">
                <select id="search-medicamento-select">
                    <option value="0" selected>Nombre</option>
                    <option value="1">Precio</option>
                    <option value="2">Fecha de Caducidad</option>
                </select>
                <input type="text" id="search-medicamento" placeholder="Introduce un texto a buscar">
                <img id="search-medicamento-img" src="../img/svg/search.svg" alt="Buscar">
            </article>
            <button class="create" id="nuevo-medicamento">
                <img src="../img/svg/create.svg" alt="Crear Medicamento">
                <p>Crear</p>
            </button>
            <article class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th class="sort-column" id="sort-nombre-medicamento" value="0">
                                <p>Nombre</p>
                                <img value="-1" id="sort-nombre-medicamento-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                            <th class="sort-column" id="sort-precio-medicamento" value="1">
                                <p>Precio</p>
                                <img value="-1" id="sort-precio-medicamento-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                            <th class="sort-column" id="sort-fecha-caducidad-medicamento" value="2">
                                <p>Fecha de Caducidad</p>
                                <img value="-1" id="sort-fecha-caducidad-medicamento-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                        </tr>
                    </thead>
                    <tbody id="table-medicamento">
                        <?php
                        $rowsMedicamento = selectAll(medicamento::class);
                        $reflectMedicamento = new ReflectionClass(medicamento::class);
                        $keysMedicamento = array_keys($reflectMedicamento -> getConstants());
                        $numMedicamentos = count($keysMedicamento);
                        foreach ($rowsMedicamento as $row) { ?>
                            <tr value="<?php echo $row['id']; ?>">
                            <?php
                            for ($i = 1; $i < $numMedicamentos; $i++) { ?>
                                    <td><?php echo $row[$keysMedicamento[$i]]; ?></td>
                                    <?php
                            } ?>
                            </tr>
                            <?php
                        }
                        ?>
                    </tbody>
                </table>
            </article>
            <section class="modal-container hide" id="modal-medicamento-container">
                <form class="modal">
                    <div class="row--header">
                        <img src="../img/svg/user.svg" alt="Crear Medicamento">
                        <h2>Crear Medicamento</h2>
                    </div>
                    <div class="row">
                        <div class="column">
                            <label for="nombre-medicamento">Nombre</label>
                            <input type="text" class="input-form" id="nombre-medicamento" required>
                            <article id="nombre-medicamento-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca un nombre de medicamento</p>
                            </article>
                        </div>
                        <div class="column">
                            <label for="precio-medicamento">Precio</label>
                            <input type="text" class="input-form" id="precio-medicamento" placeholder="1234.56" required>
                            <article id="precio-medicamento-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca el precio del medicamento</p>
                            </article>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column">
                            <label for="fecha-caducidad-medicamento">Fecha de Caducidad</label>
                            <input type="date" class="input-form" id="fecha-caducidad-medicamento" required>
                            <article id="fecha-caducidad-medicamento-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca la fecha de caducidad del medicamento</p>
                            </article>
                        </div>
                    </div>
                    <div class="row--buttons">
                        <button class="accept" id="accept-medicamento">Aceptar</button>
                        <button class="cancel">Cancelar</button>
                    </div>
                </form>
            </section>
            <section class="modal-container hide" id="modal-medicamento-actualizar-container">
                <form class="modal">
                    <div class="row--header">
                        <img src="../img/svg/user.svg" alt="Actualizar Medicamento">
                        <h2>Actualizar Medicamento</h2>
                    </div>
                    <div class="row">
                        <div class="column">
                            <label for="nombre-medicamento-actualizar">Nombre</label>
                            <input type="text" class="input-form" id="nombre-medicamento-actualizar" required>
                            <article id="nombre-medicamento-actualizar-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca un nombre de medicamento</p>
                            </article>
                        </div>
                        <div class="column">
                            <label for="precio-medicamento-actualizar">Precio</label>
                            <input type="text" class="input-form" id="precio-medicamento-actualizar" placeholder="1234.56" required>
                            <article id="precio-medicamento-actualizar-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca el precio del medicamento</p>
                            </article>
                        </div>
                    </div>
                    <div class="row--buttons">
                        <button class="accept" id="accept-medicamento-actualizar">Aceptar</button>
                        <button class="cancel">Cancelar</button>
                    </div>
                </form>
            </section>
        </section>
        <section id="doctor" class="hide">
            <article class="search">
                <select id="search-doctor-select">
                    <option value="0" selected>DNI</option>
                    <option value="1">Nombre</option>
                    <option value="2">Apellidos</option>
                </select>
                <input type="text" id="search-doctor" placeholder="Introduce un texto a buscar">
                <img id="search-doctor-img" src="../img/svg/search.svg" alt="Buscar">
            </article>
            <button class="create" id="nuevo-doctor">
                <img src="../img/svg/create.svg" alt="Crear Doctor">
                <p>Crear</p>
            </button>
            <article class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th class="sort-column" id="sort-dni-doctor" value="0">
                                <p>DNI</p>
                                <img value="-1" id="sort-dni-doctor-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                            <th class="sort-column" id="sort-nombre-doctor" value="1">
                                <p>Nombre</p>
                                <img value="-1" id="sort-nombre-doctor-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                            <th class="sort-column" id="sort-apellidos-doctor" value="2">
                                <p>Apellidos</p>
                                <img value="-1" id="sort-apellidos-doctor-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                        </tr>
                    </thead>
                    <tbody id="table-doctor">
                        <?php
                        $reflectDoctor = new ReflectionClass(doctor::class);
                        $keysDoctor = array_keys($reflectDoctor -> getConstants());
                        foreach ($rowsDoctor as $row) { ?>
                            <tr>
                            <?php
                            foreach ($keysDoctor as $key) { ?>
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
            <section class="modal-container hide" id="modal-doctor-container">
                <form class="modal">
                    <div class="row--header">
                        <img src="../img/svg/user.svg" alt="Crear Doctor">
                        <h2>Crear Doctor</h2>
                    </div>
                    <div class="row">
                        <div class="column">
                            <label for="dni-doctor">DNI</label>
                            <div class="dni-container">
                                <input type="text" class="input-form" id="dni-doctor" maxlength="9" required>
                                <img id="dni-doctor-correcto" class="hide" src="../img/svg/green-tic.svg" alt="Correct">
                                <img id="dni-doctor-incorrecto" class="hide" src="../img/svg/error.svg" alt="Incorrect">
                            </div>
                            <article id="dni-doctor-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca un DNI. Formato (12345678A)</p>
                            </article>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column">
                            <label for="nombre-doctor">Nombre</label>
                            <input type="text" class="input-form" id="nombre-doctor" required>
                            <article id="nombre-doctor-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca el nombre del Doctor</p>
                            </article>
                        </div>
                        <div class="column">
                            <label for="apellidos-doctor">Apellidos</label>
                            <input type="text" class="input-form" id="apellidos-doctor" required>
                            <article id="apellidos-doctor-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca los apellidos del Doctor</p>
                            </article>
                        </div>
                    </div>
                    <div class="row--buttons">
                        <button class="accept" id="accept-doctor">Aceptar</button>
                        <button class="cancel">Cancelar</button>
                    </div>
                </form>
            </section>
        </section>
        <section id="consulta" class="hide">
            <article class="search">
                <select id="search-consulta-select">
                    <option value="0" selected>DNI Enfermo</option>
                    <option value="1">DNI Doctor</option>
                    <option value="2">Fecha Consulta</option>
                    <option value="3">Número de Sala</option>
                    <option value="4">Nombre Medicamento</option>
                    <option value="5">Precio Medicamento</option>
                    <option value="6">Fecha de Caducidad del Medicamento</option>
                </select>
                <input type="text" id="search-consulta" placeholder="Introduce un texto a buscar">
                <img id="search-consulta-img" src="../img/svg/search.svg" alt="Buscar">
            </article>
            <button class="create" id="nuevo-consulta">
                <img src="../img/svg/create.svg" alt="Crear Consulta">
                <p>Crear</p>
            </button>
            <article class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th class="sort-column" id="sort-dni-enfermo-consulta" value="0">
                                <p>DNI Enfermo</p>
                                <img value="-1" id="sort-dni-enfermo-consulta-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                            <th class="sort-column" id="sort-dni-doctor-consulta" value="1">
                                <p>DNI Doctor</p>
                                <img value="-1" id="sort-dni-doctor-consulta-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                            <th class="sort-column" id="sort-fecha-consulta" value="2">
                                <p>Fecha de la Consulta</p>
                                <img value="-1" id="sort-fecha-consulta-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                            <th class="sort-column" id="sort-num-sala-consulta" value="3">
                                <p>Número de Sala</p>
                                <img value="-1" id="sort-num-sala-consulta-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                            <th class="sort-column" id="sort-nombre-medicamento-consulta" value="4">
                                <p>Nombre del Medicamento</p>
                                <img value="-1" id="sort-nombre-medicamento-consulta-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                            <th class="sort-column" id="sort-precio-medicamento-consulta" value="5">
                                <p>Precio del Medicamento</p>
                                <img value="-1" id="sort-precio-medicamento-consulta-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                            <th class="sort-column" id="sort-fecha-caducidad-medicamento-consulta" value="6">
                                <p>Fecha de Caducidad del Medicamento</p>
                                <img value="-1" id="sort-fecha-caducidad-medicamento-consulta-type" src="../img/svg/arrow-up.svg" alt="Arrow">
                            </th>
                        </tr>
                    </thead>
                    <tbody id="table-consulta">
                        <?php
                        $rowsConsultaMedicamento = selectAll(v_consulta_medicamento::class);
                        $reflectConsultaMedicamento = new ReflectionClass(v_consulta_medicamento::class);
                        $keysConsultaMedicamento = array_keys($reflectConsultaMedicamento -> getConstants());
                        foreach ($rowsConsultaMedicamento as $row) { ?>
                            <tr>
                            <?php
                            foreach ($keysConsultaMedicamento as $key) { ?>
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
            <section class="modal-container hide" id="modal-consulta-container">
                <form class="modal">
                    <div class="row--header">
                        <img src="../img/svg/user.svg" alt="Crear Consulta">
                        <h2>Crear Consulta</h2>
                    </div>
                    <div class="row">
                        <div class="column">
                            <label for="dni-enfermo-consulta">DNI Enfermo</label>
                            <div class="list-relative">
                                <input type="text" class="input-form" id="dni-enfermo-consulta" maxlength="9" required>
                                <div class="list hide" id="lista-enfermos">
                                    <?php
                                    foreach ($rowsEnfermo as $row) { ?>
                                        <article class="list-item lista-enfermos-item-consulta">
                                            <p class="list-item-important"><?php echo $row['dni'] ?></p>
                                            <p><?php echo $row['nombre'] . ' ' . $row['apellidos']; ?></p>
                                        </article>
                                        <?php
                                    }
                                    ?>
                                </div>
                            </div>
                            <article id="dni-enfermo-consulta-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca un DNI existente de enfermo</p>
                            </article>
                        </div>
                        <div class="column">
                            <label for="dni-doctor-consulta">DNI Doctor Asignado</label>
                            <div class="list-relative">
                                <input type="text" class="input-form" id="dni-doctor-consulta" maxlength="9" required>
                                <div class="list hide" id="lista-doctores">
                                    <?php
                                    foreach ($rowsDoctor as $row) { ?>
                                        <article class="list-item lista-doctores-item-consulta">
                                            <p class="list-item-important"><?php echo $row['dni'] ?></p>
                                            <p><?php echo $row['nombre'] . ' ' . $row['apellidos']; ?></p>
                                        </article>
                                        <?php
                                    }
                                    ?>
                                </div>
                            </div>
                            <article id="dni-doctor-consulta-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca un DNI existente de doctor</p>
                            </article>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column">
                            <label for="num-sala-consulta">Número de Sala</label>
                            <input type="number" class="input-form" id="num-sala-consulta" required>
                            <article id="num-sala-consulta-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca un número de Sala</p>
                            </article>
                        </div>
                        <div class="column">
                            <label for="fecha-consulta">Fecha de la Consulta</label>
                            <input type="date" class="input-form" id="fecha-consulta" required>
                            <article id="fecha-consulta-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca una fecha</p>
                            </article>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column">
                            <label for="medicamento-consulta">Medicamento (Opcional)</label>
                            <div class="list-relative">
                                <input type="text" class="input-form" id="medicamento-consulta" required>
                                <div class="list hide" id="lista-medicamentos-consulta">
                                    <?php
                                    foreach ($rowsMedicamento as $row) { ?>
                                        <article class="list-item lista-medicamentos-item-consulta">
                                            <p class="list-item-important"><?php echo $row['id'] ?></p>
                                            <p><?php echo $row['nombre']; ?></p>
                                            <p><?php echo $row['precio']; ?></p>
                                            <p><?php echo $row['fecha_caducidad']; ?></p>
                                        </article>
                                        <?php
                                    }
                                    ?>
                                </div>
                            </div>
                            <article id="medicamento-consulta-error" class="input-error hide">
                                <img src="../img/svg/alert.svg" alt="Alert">
                                <p>Introduzca un Medicamento</p>
                            </article>
                        </div>
                    </div>
                    <div class="row--buttons">
                        <button class="accept" id="accept-consulta">Aceptar</button>
                        <button class="cancel">Cancelar</button>
                    </div>
                </form>
            </section>
        </section>
        <section class="modal-container hide" id="modal-info-container">
            <article class="modal modal-info">
                <img id="modal-info-correcto" class="hide" src="../img/svg/green-tic.svg" alt="Correcto">
                <img id="modal-info-incorrecto" class="hide" src="../img/svg/error.svg" alt="Incorrecto">
                <p id="modal-info-mensaje"></p>
                <button class="btn-accept cancel">Aceptar</button>
            </article>
        </section>
    </main>
    <section value="0" id="open-left-panel">
        <img id="open-left-panel-img" src="../img/svg/arrow-up.svg" alt="Abrir Panel Izquierdo">
    </section>
</body>
</html>