<?php
include 'solo_admin.php';

$res = $conexion->query("SELECT id, titulo, modulo, descripcion, archivo, archivo_nombre FROM temas ORDER BY id DESC");
echo json_encode($res->fetch_all(MYSQLI_ASSOC));
?>