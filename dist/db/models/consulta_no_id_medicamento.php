<?php
/**
 * Enum utilizado para realizar un SELECT con la tabla consulta pero sin el id del medicamento (ya que el medicamento
 * en la tabla Consulta es opcional)
 */
enum consulta {
    case dni_enfermo;
    case dni_doctor;
    case num_sala;
    case fecha;
}
?>