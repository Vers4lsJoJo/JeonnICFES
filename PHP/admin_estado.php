<?php
include 'solo_admin.php';

$id     = (int)$_POST['id'];
$activo = (int)$_POST['activo'] === 1 ? 1 : 0;

if ($id === (int)$_SESSION['uid']) {
    echo json_encode(['ok' => false, 'msg' => 'no_puedes_inhabilitarte']);
    exit;
}

$stmt = $conexion->prepare("UPDATE usuarios SET activo = ? WHERE id_Usuarios = ?");
$stmt->bind_param("ii", $activo, $id);
echo json_encode(['ok' => $stmt->execute()]);
?>