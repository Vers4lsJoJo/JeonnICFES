<?php
include 'conexion.php';
session_start();

$_SESSION = [];

if (ini_get("session.use_cookies")) {
    setcookie(session_name(), '', time() - 42000, '/');
}

session_destroy();

header("location: ../Frontend/HTML/Login.html?msg=Sesión_cerrada");

exit;
?>