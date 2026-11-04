<?php
include 'conexion.php';

if (!isset($_SESSION['uid']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: ../Frontend/HTML/Login.html");
    exit;
}

$uid = (int)$_SESSION['uid'];

$stmt = $conexion->prepare("DELETE FROM simulacro WHERE usuario_id = ?");
$stmt->bind_param("i", $uid);
$stmt->execute();

$stmt = $conexion->prepare("DELETE FROM usuarios WHERE id_Usuarios = ?");
$stmt->bind_param("i", $uid);
$stmt->execute();

$_SESSION = [];
session_destroy();

header("Location: ../index.html");
exit;
?>