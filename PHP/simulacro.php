<?php
include 'conexion.php';

if (!isset($_SESSION['uid'])) {
    exit;
}

$uid       = $_SESSION['uid'];
$simulacro = $_POST['simulacro'];
$resultado = $_POST['resultado'];
$pregunta  = $_POST['total'];

$sql = "SELECT COUNT(*) FROM simulacro WHERE usuario_id = $uid AND simulacro = '$simulacro'";
$res = $conexion->query($sql);
$total = $res->fetch_row()[0];

$intento = $total + 1;

$sql = "INSERT INTO simulacro (usuario_id, simulacro, resultado, intento, total)
VALUES ($uid, '$simulacro', $resultado, $intento, $pregunta)";
$conexion->query($sql);

