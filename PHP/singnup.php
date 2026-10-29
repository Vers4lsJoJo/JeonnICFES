<?php
include 'conexion.php';
$nombre = $_POST['name'];
$correo = $_POST['email'];
$contrasena = $_POST['pass'];
$confirmarContrasena = $_POST['confirm-pass'];

if (filter_var($correo, FILTER_VALIDATE_EMAIL)){

    if ($contrasena == $confirmarContrasena) {
        $sql = "INSERT INTO usuarios (name, email, pass) VALUES ('$nombre', '$correo', '$contrasena')";
    } else {
        echo "Las contraseñas no coinciden.";
    }

} else {
    echo "El correo electrónico no es válido.";
}

echo "Registro exitoso.";
?>