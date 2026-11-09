<?php
include 'solo_admin.php';

$modulos     = ['Matemáticas', 'Lectura Crítica', 'Ciencias Naturales', 'Sociales y Ciudadanas', 'Inglés'];
$extensiones = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'png', 'jpg'];

$titulo      = trim($_POST['titulo'] ?? '');
$modulo      = $_POST['modulo'] ?? '';
$descripcion = trim($_POST['descripcion'] ?? '');

if ($titulo === '' || $descripcion === '' || !in_array($modulo, $modulos, true)) {
    echo json_encode(['ok' => false, 'msg' => 'datos_invalidos']);
    exit;
}

$archivoGuardado = null;
$archivoNombre   = null;

if (isset($_FILES['archivo']) && $_FILES['archivo']['error'] !== UPLOAD_ERR_NO_FILE) {
    $f = $_FILES['archivo'];

    if ($f['error'] === UPLOAD_ERR_INI_SIZE || $f['error'] === UPLOAD_ERR_FORM_SIZE || $f['size'] > 5 * 1024 * 1024) {
        echo json_encode(['ok' => false, 'msg' => 'archivo_grande']);
        exit;
    }

    if ($f['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['ok' => false, 'msg' => 'error_subida']);
        exit;
    }

    $ext = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));

    if (!in_array($ext, $extensiones, true)) {
        echo json_encode(['ok' => false, 'msg' => 'archivo_no_permitido']);
        exit;
    }

    $carpeta = __DIR__ . '/../Archivos/temas/';

    if (!is_dir($carpeta) && !@mkdir($carpeta, 0755, true)) {
        echo json_encode(['ok' => false, 'msg' => 'error_subida']);
        exit;
    }

    $archivoGuardado = bin2hex(random_bytes(8)) . '.' . $ext;

    if (!@move_uploaded_file($f['tmp_name'], $carpeta . $archivoGuardado)) {
        echo json_encode(['ok' => false, 'msg' => 'error_subida']);
        exit;
    }

    $archivoNombre = mb_substr(basename($f['name']), 0, 200);
}

$stmt = $conexion->prepare("INSERT INTO temas (titulo, modulo, descripcion, archivo, archivo_nombre) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $titulo, $modulo, $descripcion, $archivoGuardado, $archivoNombre);
echo json_encode(['ok' => $stmt->execute()]);
?>