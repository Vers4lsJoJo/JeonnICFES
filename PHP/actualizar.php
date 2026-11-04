<?php
include 'conexion.php';

if (!isset($_SESSION['uid']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: ../Frontend/HTML/Login.html");
    exit;
}

$uid    = (int)$_SESSION['uid'];
$nombre = trim($_POST['name']);
$correo = trim($_POST['email']);

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    header("Location: ../Frontend%20User/HTML/Hub.html?msg=correo_invalido");
    exit;
}

$stmt = $conexion->prepare("UPDATE usuarios SET name = ?, email = ? WHERE id_Usuarios = ?");
$stmt->bind_param("ssi", $nombre, $correo, $uid);

if ($stmt->execute()) {
    header("Location: ../Frontend%20User/HTML/Hub.html?msg=actualizado");
} else {
    header("Location: ../Frontend%20User/HTML/Hub.html?msg=error");
}
exit;
?>