<?php
include 'solo_admin.php';

$id     = (int)$_POST['id'];
$nombre = trim($_POST['name']);
$correo = trim($_POST['email']);
$rol    = $_POST['rol'];

if ($nombre === '' || !filter_var($correo, FILTER_VALIDATE_EMAIL) || !in_array($rol, ['usuario', 'admin'])) {
    echo json_encode(['ok' => false]);
    exit;
}

if ($id === (int)$_SESSION['uid'] && $rol !== 'admin') {
    echo json_encode(['ok' => false]);
    exit;
}

$stmt = $conexion->prepare("UPDATE usuarios SET name = ?, email = ?, rol = ? WHERE id_Usuarios = ?");
$stmt->bind_param("sssi", $nombre, $correo, $rol, $id);
echo json_encode(['ok' => $stmt->execute()]);
?>