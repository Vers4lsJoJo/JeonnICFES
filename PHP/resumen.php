<?php
include 'conexion.php';
header('Content-Type: application/json');

if (!isset($_SESSION['uid'])) {
    echo json_encode(['en_proceso' => 0, 'completos' => 0]);
    exit;
}

$uid = (int)$_SESSION['uid'];

$sql = "SELECT
            COALESCE(SUM(mejor < 75), 0)  AS en_proceso,
            COALESCE(SUM(mejor >= 75), 0) AS completos
        FROM (
            SELECT MAX(resultado / total * 100) AS mejor
            FROM simulacro
            WHERE usuario_id = $uid
            GROUP BY simulacro
        ) AS mejores";

$fila = $conexion->query($sql)->fetch_assoc();

echo json_encode([
    'en_proceso' => (int)$fila['en_proceso'],
    'completos'  => (int)$fila['completos']
]);
?>