const msg = new URLSearchParams(window.location.search).get('msg');
const alerta = document.getElementById('alerta');

switch (msg) {
    case "exito":
        alerta.textContent = "Registro exitoso";
        alerta.className = "alerta-exito";
        break;
    case "error":
        alerta.textContent = "Error al registrar intente nuevamente o regresa mas tarde";
        alerta.className = "alerta-error";
        break;
    case "no_coinciden":
        alerta.textContent = "las contraseñas no coinciden";
        alerta.className = "alerta-pass";
        break;
    case "correo_invalido":
        alerta.textContent = "El correo electrónico no es válido";
        alerta.className = "alerta-email";
        break;
    case "Sesión_cerrada":
        alerta.textContent = "Sesión cerrada exitosamente";
        alerta.className = "alerta-exito";
        break;
    case "nicio_exi":
        alerta.textContent = "Inicio de sesión exitoso";
        alerta.className = "alerta-exito";
        break;
    case "mal":
        alerta.textContent = "Usuario o contraseña incorrectos";
        alerta.className = "alerta-error";
        break;
}
