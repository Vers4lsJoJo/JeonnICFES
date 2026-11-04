<?php
include 'conexion.php';
$nombre = $_POST['name'];
$correo = $_POST['email'];
$contrasena = $_POST['pass'];
$confirmarContrasena = $_POST['confirm-pass'];

if (mb_strlen($contrasena) < 8) {
    header("Location: ../Frontend/HTML/Signup.html?msg=pass_corta");
    exit;
}

if (filter_var($correo, FILTER_VALIDATE_EMAIL)){

    if ($contrasena == $confirmarContrasena) {
        $sql = "INSERT INTO usuarios (name, email, pass) VALUES ('$nombre', '$correo', '$contrasena')";
        if ($conexion->query($sql)) {
            header("Location: ../Frontend/HTML/Signup.html?msg=exito");
        } else {
            header("Location: ../Frontend/HTML/Signup.html?msg=error");
        }
    } else {
        header("Location: ../Frontend/HTML/Signup.html?msg=no_coinciden");    
    }

} else {
    header("Location: ../Frontend/HTML/Signup.html?msg=correo_invalido");    
}
exit;
?>