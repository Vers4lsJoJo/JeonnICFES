<?php
include 'conexion.php';

header('Content-Type: application/json; charset=utf-8');

// Verificar sesión
if (!isset($_SESSION['uid'])) {
    http_response_code(401);
    echo json_encode(["error" => "No has iniciado sesión"]);
    exit;
}

$modulo = trim($_GET['modulo'] ?? '');

$stmt = $conexion->prepare(
    "SELECT id, titulo, modulo, descripcion, archivo, archivo_nombre, fecha
     FROM temas WHERE modulo = ? ORDER BY id DESC"
);
$stmt->bind_param("s", $modulo);
$stmt->execute();
$resultado = $stmt->get_result();

if (!$resultado) {
    http_response_code(500);
    echo json_encode(["error" => $conexion->error]);
    exit;
}

// Convertir resultados a JSON
$temas = [];

while ($fila = $resultado->fetch_assoc()) {
    $temas[] = $fila;
}

echo json_encode($temas, JSON_UNESCAPED_UNICODE);
?>