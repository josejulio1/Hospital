<?php
/**
 * Enum utilizado para realizar un SELECT con la vista de v_consulta_medicamento
 */
enum v_consulta_medicamento {
    case dni_enfermo;
    case dni_doctor;
    case fecha;
    case num_sala;
    case nombre_medicamento;
    case precio_medicamento;
    case fecha_caducidad_medicamento;
}
?>