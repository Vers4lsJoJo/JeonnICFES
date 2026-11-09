<?php
include 'solo_admin.php';

$res = $conexion->query("SELECT id_Usuarios AS id, name, email, rol, activo FROM usuarios ORDER BY id_Usuarios");
echo json_encode($res->fetch_all(MYSQLI_ASSOC));
?>