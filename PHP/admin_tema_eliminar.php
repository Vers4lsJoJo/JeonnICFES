<?php
include 'solo_admin.php';

$id = (int)$_POST['id'];

$stmt = $conexion->prepare("SELECT archivo FROM temas WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$tema = $stmt->get_result()->fetch_assoc();

if (!$tema) {
    echo json_encode(['ok' => false]);
    exit;
}

$stmt = $conexion->prepare("DELETE FROM temas WHERE id = ?");
$stmt->bind_param("i", $id);
$ok = $stmt->execute();

if ($ok && $tema['archivo']) {
    $ruta = __DIR__ . '/../Archivos/temas/' . basename($tema['archivo']);
    if (is_file($ruta)) {
        unlink($ruta);
    }
}

echo json_encode(['ok' => $ok]);
?>