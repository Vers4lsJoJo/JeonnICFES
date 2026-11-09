<?php
include 'conexion.php';

if (!isset($_SESSION['uid']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: ../Frontend/HTML/Login.html");
    exit;
}

$uid    = (int)$_SESSION['uid'];
$nombre = trim($_POST['name']);
$pass      = trim($_POST['pass']);
$confirmar = trim($_POST['confirm-pass']);

if (mb_strlen($pass) < 8) {
    header("Location: ../Frontend%20User/HTML/Hub.html?msg=pass_corta");
    exit;
}

if ($pass !== $confirmar) {
    header("Location: ../Frontend%20User/HTML/Hub.html?msg=no_coinciden");
    exit;
}
$stmt = $conexion->prepare("UPDATE usuarios SET name = ?, pass = ? WHERE id_Usuarios = ?");
$stmt->bind_param("ssi", $nombre, $pass, $uid);
if ($stmt->execute()) {
    header("Location: ../Frontend%20User/HTML/Hub.html?msg=actualizado");
} else {
    header("Location: ../Frontend%20User/HTML/Hub.html?msg=error");
}
exit;
?>