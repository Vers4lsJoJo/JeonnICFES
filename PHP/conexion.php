<?php
$server = "localhost";
$user   = "root";
$pass   = "";
$db     = "jeonn";

$conexion = new mysqli($server, $user, $pass, $db);

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

$conexion->set_charset("utf8");

?>
