<?php

include 'conexion.php';
$mal = $_POST['mail'];
$pas = $_POST['pass'];

$sql = "SELECT * FROM usuarios WHERE email = '$mal' AND pass = '$pas' AND activo = 1";

$resultado = $conexion->query($sql);

if ($resultado->num_rows > 0) {
    $fila = $resultado->fetch_assoc();
    $_SESSION['uid'] = $fila['id_Usuarios'];
    $_SESSION['rol'] = $fila['rol'];

    if ($fila['rol'] === 'admin') {
        header("Location: ../Frontend User/HTML/Admin.html");
    } else {
        header("Location: ../Frontend User/HTML/Hub.html");
    }
    exit;} else {
    header("Location: ../Frontend/HTML/Login.html?msg=mal");
}
?>
