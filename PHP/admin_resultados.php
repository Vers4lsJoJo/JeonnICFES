<?php
include 'solo_admin.php';

$sql = "SELECT u.name, s.simulacro,
               ROUND(MAX(s.resultado / s.total * 100), 1) AS mejor
        FROM simulacro s
        JOIN usuarios u ON u.id_Usuarios = s.usuario_id
        GROUP BY s.usuario_id, u.name, s.simulacro
        ORDER BY s.simulacro, mejor DESC";

echo json_encode($conexion->query($sql)->fetch_all(MYSQLI_ASSOC));
?>