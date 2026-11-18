<?php
include 'solo_admin.php';

$uid = (int)$_SESSION['uid'];

$stmt = $conexion->prepare("SELECT name FROM usuarios WHERE id_Usuarios = ?");
$stmt->bind_param("i", $uid);
$stmt->execute();

echo json_encode($stmt->get_result()->fetch_assoc() ?: ['name' => '']);
?>