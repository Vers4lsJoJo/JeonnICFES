
/* =====================================
   JEONN ICFES - ADMINISTRADOR
===================================== */

// Almacenamiento de información
const CLAVES = {
    temas: "jeonn_temas",
    usuarios: "jeonn_usuarios",
};

// DATOS DE EJEMPLO
const temasIniciales = [
    {
        id: 1,
        titulo: "Números y operaciones",
        modulo: "Matemáticas",
        descripcion: "Números reales, fracciones, porcentajes y proporciones.",
        archivo: ""
    },
    {
        id: 2,
        titulo: "Diferencia entre tema y tesis",
        modulo: "Lectura Crítica",
        descripcion: "Aprende a identificar la idea central y la tesis de un texto.",
        archivo: ""
    },
    {
        id: 3,
        titulo: "Ecosistemas",
        modulo: "Ciencias Naturales",
        descripcion: "Relaciones entre los seres vivos y su entorno.",
        archivo: ""
    }
];

const usuariosIniciales = [
    {
        id: 1,
        nombre: "María Rodríguez",
        correo: "maria@email.com",
        rol: "Estudiante",
        activo: true
    },
    {
        id: 2,
        nombre: "Juan Pérez",
        correo: "juan@email.com",
        rol: "Estudiante",
        activo: true
    },
    {
        id: 3,
        nombre: "Laura Gómez",
        correo: "laura@email.com",
        rol: "Docente",
        activo: true
    },
    {
        id: 4,
        nombre: "Carlos Díaz",
        correo: "carlos@email.com",
        rol: "Estudiante",
        activo: true
    }
];

// LEER DATOS GUARDADOS
function cargarDatos(clave, datosIniciales) {

    try {
        const datos = localStorage.getItem(clave);

        return datos ? JSON.parse(datos) : datosIniciales;

    } catch (error) {
        console.error("Error leyendo los datos:", error);
        return datosIniciales;
    }
}

// GUARDAR DATOS
function guardarDatos(clave, datos) {
    localStorage.setItem(clave, JSON.stringify(datos));
}

// VARIABLES
let temas = [];

let usuarios = [];

let usuarioPendiente = null;


// =====================================
// NAVEGACIÓN
// =====================================

const botonesMenu = document.querySelectorAll(".nav-link");

function mostrarSeccion(nombre) {

    document.querySelectorAll(".seccion").forEach(seccion => {
        seccion.classList.remove("activa");
    });

    botonesMenu.forEach(boton => {
        boton.classList.remove("activo");
    });

    document.getElementById(nombre).classList.add("activa");

    const botonActivo = document.querySelector(
        `[data-seccion="${nombre}"]`
    );

    if (botonActivo) {
        botonActivo.classList.add("activo");
        document.getElementById("nombreSeccion").textContent =
            botonActivo.textContent.trim();
    }

    document.getElementById("sidebar").classList.remove("abierto");
}

botonesMenu.forEach(boton => {

    boton.addEventListener("click", () => {
        mostrarSeccion(boton.dataset.seccion);
    });

});

// ACCESOS RÁPIDOS
document.querySelectorAll("[data-ir]").forEach(boton => {

    boton.addEventListener("click", () => {
        mostrarSeccion(boton.dataset.ir);
    });

});

// MENÚ MÓVIL
document.getElementById("menuToggle").addEventListener("click", () => {

    document.getElementById("sidebar").classList.toggle("abierto");

});


// =====================================
// RESUMEN
// =====================================

function actualizarEstadisticas() {

    document.getElementById("totalTemas").textContent = temas.length;

    document.getElementById("totalUsuarios").textContent =
        usuarios.filter(usuario => usuario.activo).length;

    document.getElementById("cantidadTemas").textContent = temas.length;
}

const ERRORES_TEMA = {
    datos_invalidos: "Completa el nombre, el módulo y la descripción.",
    archivo_no_permitido: "Ese tipo de archivo no está permitido.",
    archivo_grande: "El archivo pesa más de 5 MB.",
    error_subida: "No se pudo subir el archivo."
};

function avisoTema(texto, esError) {
    document.getElementById("mensajeTema").style.color = esError ? "#d46a6a" : "";
    mostrarMensaje("mensajeTema", texto);
}

const formularioTema = document.getElementById("formTema");

formularioTema.addEventListener("submit", function(event) {

    event.preventDefault();

    const datos = new FormData();
    datos.append("titulo", document.getElementById("tituloTema").value.trim());
    datos.append("modulo", document.getElementById("moduloTema").value);
    datos.append("descripcion", document.getElementById("descripcionTema").value.trim());

    const archivo = document.getElementById("archivoTema").files[0];
    if (archivo) datos.append("archivo", archivo);

    fetch(API + "admin_tema_crear.php", { method: "POST", body: datos })
        .then(res => res.json())
        .then(r => {
            if (r.ok) {
                formularioTema.reset();
                cargarTemas();
                avisoTema("¡El tema se agregó correctamente!", false);
            } else {
                avisoTema(ERRORES_TEMA[r.msg] || "No se pudo guardar el tema.", true);
            }
        })
        .catch(() => avisoTema("No se pudo guardar el tema.", true));

});

function cargarTemas() {
    pedir("admin_temas.php").then(lista => {
        if (lista.error) {
            window.location.href = "../../Frontend/HTML/Login.html";
            return;
        }
        temas = lista;
        mostrarTemas();
    });
}

function mostrarTemas() {

    const lista = document.getElementById("listaTemas");

    lista.innerHTML = "";

    if (temas.length === 0) {
        lista.innerHTML = `<p class="vacio">Todavía no hay temas registrados.</p>`;
        actualizarEstadisticas();
        return;
    }

    temas.forEach(tema => {

        const tarjeta = document.createElement("article");
        tarjeta.className = "tema";

        const informacionTema = document.createElement("div");
        informacionTema.className = "tema-info";

        const titulo = document.createElement("h3");
        titulo.textContent = tema.titulo;

        const modulo = document.createElement("small");
        modulo.textContent = tema.modulo + " ";

        if (tema.archivo) {
            const enlace = document.createElement("a");
            enlace.href = "../../Archivos/temas/" + encodeURIComponent(tema.archivo);
            enlace.target = "_blank";
            enlace.textContent = "· " + tema.archivo_nombre;
            modulo.append(enlace);
        }

        const descripcion = document.createElement("p");
        descripcion.textContent = tema.descripcion;

        informacionTema.append(titulo, modulo, descripcion);

        const botonEliminar = document.createElement("button");
        botonEliminar.className = "btn-eliminar-tema";
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", () => {

            if (!confirm(`¿Deseas eliminar el tema "${tema.titulo}"?`)) return;

            pedir("admin_tema_eliminar.php", { id: tema.id }).then(r => {
                if (r.ok) {
                    cargarTemas();
                } else {
                    alert("No se pudo eliminar el tema.");
                }
            });

        });

        tarjeta.append(informacionTema, botonEliminar);
        lista.appendChild(tarjeta);

    });

    actualizarEstadisticas();
}

// =====================================
// GESTIÓN DE USUARIOS
// =====================================

function celda(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}

function insignia(activo) {
    const span = document.createElement("span");
    span.className = activo ? "estado-usuario" : "estado-usuario estado-inactivo";
    span.textContent = activo ? "Activo" : "Acceso retirado";

    const td = document.createElement("td");
    td.append(span);
    return td;
}

function mostrarUsuarios(filtro = "") {
    const tabla = document.getElementById("tablaUsuarios");
    tabla.innerHTML = "";

    const encontrados = usuarios.filter(u =>
        `${u.nombre} ${u.correo}`.toLowerCase().includes(filtro.toLowerCase())
    );

    if (encontrados.length === 0) {
        tabla.innerHTML = `<tr><td colspan="4">No se encontraron usuarios.</td></tr>`;
        return;
    }

    encontrados.forEach(u => {
        const fila = document.createElement("tr");
        fila.append(celda(u.nombre), celda(u.correo), celda(u.rol), insignia(u.activo));
        tabla.append(fila);
    });
}

function mostrarGestion() {
    const tabla = document.getElementById("tablaGestion");
    tabla.innerHTML = "";

    usuarios.forEach(u => {
        const fila = document.createElement("tr");
        const acciones = document.createElement("td");

        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.className = "btn-secundario";
        botonEditar.addEventListener("click", () => abrirEdicion(u));

        const botonEstado = document.createElement("button");

        if (u.activo) {
            botonEstado.textContent = "Retirar acceso";
            botonEstado.className = "btn-retirar";
            botonEstado.addEventListener("click", () => {
                usuarioPendiente = u.id;
                document.getElementById("mensajeConfirmacion").textContent =
                    `¿Deseas retirar el acceso de ${u.nombre}?`;
                document.getElementById("modalConfirmacion").classList.add("abierto");
            });
        } else {
            botonEstado.textContent = "Reactivar";
            botonEstado.className = "btn-reactivar";
            botonEstado.addEventListener("click", () => cambiarEstado(u.id, 1));
        }

        acciones.append(botonEditar, botonEstado);
        fila.append(celda(u.nombre), celda(u.correo), celda(u.rol), insignia(u.activo), acciones);
        tabla.append(fila);
    });
}

const API = "../../PHP/";

function pedir(archivo, datos) {
    const opciones = datos ? { method: "POST", body: new URLSearchParams(datos) } : {};
    return fetch(API + archivo, opciones).then(res => res.json());
}

function cargarUsuarios() {
    pedir("admin_usuarios.php").then(lista => {
        if (lista.error) {
            window.location.href = "../../Frontend/HTML/Login.html";
            return;
        }

        usuarios = lista.map(u => ({
            id: Number(u.id),
            nombre: u.name,
            correo: u.email,
            rol: u.rol,
            activo: u.activo == 1
        }));

        mostrarUsuarios(document.getElementById("buscarUsuario").value);
        mostrarGestion();
        actualizarEstadisticas();
    });
}

function cambiarEstado(id, activo) {
    pedir("admin_estado.php", { id: id, activo: activo }).then(r => {
        if (r.ok) {
            cargarUsuarios();
        } else {
            alert(r.msg === "no_puedes_inhabilitarte"
                ? "No puedes retirar tu propio acceso."
                : "No se pudo cambiar el estado.");
        }
    });
}

function abrirEdicion(u) {
    document.getElementById("editId").value = u.id;
    document.getElementById("editNombre").value = u.nombre;
    document.getElementById("editCorreo").value = u.correo;
    document.getElementById("editRol").value = u.rol;
    document.getElementById("mensajeEditar").textContent = "";
    document.getElementById("panelEditar").hidden = false;
    document.getElementById("panelEditar").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("cancelarEditar").addEventListener("click", () => {
    document.getElementById("panelEditar").hidden = true;
});

document.getElementById("formEditar").addEventListener("submit", e => {
    e.preventDefault();
    const mensaje = document.getElementById("mensajeEditar");
    mensaje.style.color = "#d46a6a";

    pedir("admin_editar.php", {
        id: document.getElementById("editId").value,
        name: document.getElementById("editNombre").value,
        email: document.getElementById("editCorreo").value,
        rol: document.getElementById("editRol").value
    })
    .then(r => {
        if (r.ok) {
            document.getElementById("panelEditar").hidden = true;
            cargarUsuarios();
        } else {
            mensaje.textContent = "No se pudo guardar. Revisa los datos.";
        }
    })
    .catch(() => {
        mensaje.textContent = "No se pudo guardar. Puede que el correo ya esté en uso.";
    });
});

function cargarTabla(archivo, idTbody, columnas) {
    pedir(archivo).then(filas => {
        const tbody = document.getElementById(idTbody);
        tbody.innerHTML = "";

        if (filas.length === 0) {
            tbody.innerHTML = `<tr><td colspan="${columnas.length}">Todavía no hay simulacros presentados.</td></tr>`;
            return;
        }

        filas.forEach(f => {
            const tr = document.createElement("tr");
            columnas.forEach(c => tr.append(celda(f[c])));
            tbody.append(tr);
        });
    });
}



// BUSCADOR
document.getElementById("buscarUsuario").addEventListener("input", function() {

    mostrarUsuarios(this.value);

});


// CONFIRMAR RETIRO DE ACCESO
document.getElementById("confirmarRetiro").addEventListener("click", () => {

    if (usuarioPendiente === null) return;

    cambiarEstado(usuarioPendiente, 0);

    cerrarModal();

});

// CANCELAR
document.getElementById("cancelarRetiro").addEventListener("click", cerrarModal);

function cerrarModal() {

    usuarioPendiente = null;

    document.getElementById("modalConfirmacion")
        .classList.remove("abierto");

}

// =====================================
// MENSAJES
// =====================================

function mostrarMensaje(id, texto) {

    const mensaje = document.getElementById(id);

    mensaje.textContent = texto;

    setTimeout(() => {
        mensaje.textContent = "";
    }, 3500);

}


// =====================================
// INICIALIZACIÓN
// =====================================


cargarTemas();

cargarUsuarios();

cargarTabla("admin_resultados.php", "tablaResultados", ["name", "simulacro", "mejor"]);

cargarTabla("admin_intentos.php", "tablaIntentos", ["name", "simulacro", "intentos"]);

