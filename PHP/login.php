<?php

include 'conexion.php';
$mal = $_POST['mail'];
$pas = $_POST['pass'];

$sql = "SELECT * FROM usuarios WHERE email = '$mal' AND pass = '$pas'";
$resultado = $conexion->query($sql);

if ($resultado->num_rows > 0) {
    $fila = $resultado->fetch_assoc();
    $_SESSION['uid'] = $fila['id_Usuarios'];
    header("Location: ../index.html?msg=Inicio_exi");
} else {
    header("Location: ../Frontend/HTML/Login.html?msg=mal");
}
?>
