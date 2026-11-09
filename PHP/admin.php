<?php
include 'conexion.php';

if (!isset($_SESSION['rol']) || $_SESSION['rol'] !== 'admin') {
    header("Location: ../Frontend/HTML/Login.html");
    exit;
}
?>