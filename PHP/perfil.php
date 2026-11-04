<?php
include 'conexion.php';
header('Content-Type: application/json');

if (!isset($_SESSION['uid'])) {
    echo json_encode(['error' => 'sin_sesion']);
    exit;
}

$uid = (int)$_SESSION['uid'];

$stmt = $conexion->prepare("SELECT name, email FROM usuarios WHERE id_Usuarios = ?");
$stmt->bind_param("i", $uid);
$stmt->execute();

$usuario = $stmt->get_result()->fetch_assoc();

$stmt = $conexion->prepare("SELECT AVG(mejor) AS promedio
    FROM (
        SELECT MAX(resultado / total * 100) AS mejor
        FROM simulacro
        WHERE usuario_id = ?
        GROUP BY simulacro
    ) AS mejores");
$stmt->bind_param("i", $uid);
$stmt->execute();
$promedio = $stmt->get_result()->fetch_assoc()['promedio'];

if ($promedio === null) {
    $nivel = "Sin nivel";
} elseif ($promedio < 40) {
    $nivel = "Inicial";
} elseif ($promedio < 60) {
    $nivel = "Intermedio";
} elseif ($promedio < 75) {
    $nivel = "Avanzado";
} else {
    $nivel = "Experto";
}

$usuario['nivel'] = $nivel;
echo json_encode($usuario);
?>      