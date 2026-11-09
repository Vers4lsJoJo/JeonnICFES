<?php
include 'solo_admin.php';

$id     = (int)$_POST['id'];
$nombre = trim($_POST['name']);
$password = $_POST['password'] ?? '';
$rol    = $_POST['rol'];

if ($nombre === '' || !in_array($rol, ['usuario', 'admin']) || ($password !== '' && strlen($password) < 6)) {
    echo json_encode(['ok' => false]);
    exit;
}

if ($id === (int)$_SESSION['uid'] && $rol !== 'admin') {
    echo json_encode(['ok' => false]);
    exit;
}

if ($password !== '') {
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conexion->prepare("UPDATE usuarios SET name = ?, rol = ?, password = ? WHERE id_Usuarios = ?");
    $stmt->bind_param("sssi", $nombre, $rol, $hash, $id);
} else {
    $stmt = $conexion->prepare("UPDATE usuarios SET name = ?, rol = ? WHERE id_Usuarios = ?");
    $stmt->bind_param("ssi", $nombre, $rol, $id);
}echo json_encode(['ok' => $stmt->execute()]);
?> 