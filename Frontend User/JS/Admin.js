
/* =====================================
   JEONN ICFES - ADMINISTRADOR
===================================== */

// Almacenamiento de información
const CLAVES = {
    temas: "jeonn_temas",
    usuarios: "jeonn_usuarios",
    sitio: "jeonn_sitio"
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

const sitioInicial = {
    nombre: "Jeonn Icfes",
    frase: "Aprende, practica y alcanza tus metas.",
    descripcion: "Una plataforma educativa creada para acompañar a estudiantes de décimo y undécimo grado en su preparación para las pruebas ICFES.",
    correo: "contacto@jeonn.com"
};

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
let temas = cargarDatos(CLAVES.temas, temasIniciales);

let usuarios = cargarDatos(CLAVES.usuarios, usuariosIniciales);

let informacion = cargarDatos(CLAVES.sitio, sitioInicial);

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


// =====================================
// MÓDULOS Y TEMAS
// =====================================

const formularioTema = document.getElementById("formTema");

formularioTema.addEventListener("submit", function(event) {

    event.preventDefault();

    const titulo = document.getElementById("tituloTema").value.trim();

    const modulo = document.getElementById("moduloTema").value;

    const descripcion = document.getElementById("descripcionTema").value.trim();

    const archivo = document.getElementById("archivoTema").files[0];

    if (!titulo || !modulo || !descripcion) {
        return;
    }

    const nuevoTema = {

        id: Date.now(),

        titulo: titulo,

        modulo: modulo,

        descripcion: descripcion,

        archivo: archivo ? archivo.name : ""

    };

    temas.unshift(nuevoTema);

    guardarDatos(CLAVES.temas, temas);

    mostrarTemas();

    formularioTema.reset();

    mostrarMensaje(
        "mensajeTema",
        "¡El tema se agregó correctamente!"
    );

});


// MOSTRAR TODOS LOS TEMAS
function mostrarTemas() {

    const lista = document.getElementById("listaTemas");

    lista.innerHTML = "";

    if (temas.length === 0) {

        lista.innerHTML = `
            <p class="vacio">
                Todavía no hay temas registrados.
            </p>
        `;

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
        modulo.textContent = tema.modulo +
            (tema.archivo ? " · " + tema.archivo : "");

        const descripcion = document.createElement("p");
        descripcion.textContent = tema.descripcion;

        informacionTema.append(titulo, modulo, descripcion);

        const botonEliminar = document.createElement("button");

        botonEliminar.className = "btn-eliminar-tema";

        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", () => {

            const confirmar = confirm(
                `¿Deseas eliminar el tema "${tema.titulo}"?`
            );

            if (confirmar) {

                temas = temas.filter(item => item.id !== tema.id);

                guardarDatos(CLAVES.temas, temas);

                mostrarTemas();
            }

        });

        tarjeta.append(informacionTema, botonEliminar);

        lista.appendChild(tarjeta);

    });

    actualizarEstadisticas();
}


// =====================================
// GESTIÓN DE USUARIOS
// =====================================

function mostrarUsuarios(filtro = "") {

    const tabla = document.getElementById("tablaUsuarios");

    tabla.innerHTML = "";

    const encontrados = usuarios.filter(usuario => {

        const texto = `${usuario.nombre} ${usuario.correo}`.toLowerCase();

        return texto.includes(filtro.toLowerCase());

    });

    if (encontrados.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="5">No se encontraron usuarios.</td>
            </tr>
        `;

        return;
    }

    encontrados.forEach(usuario => {

        const fila = document.createElement("tr");

        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = usuario.nombre;

        const celdaCorreo = document.createElement("td");
        celdaCorreo.textContent = usuario.correo;

        const celdaRol = document.createElement("td");
        celdaRol.textContent = usuario.rol;

        const celdaEstado = document.createElement("td");

        const estado = document.createElement("span");

        estado.className = usuario.activo
            ? "estado-usuario"
            : "estado-usuario estado-inactivo";

        estado.textContent = usuario.activo
            ? "Activo"
            : "Acceso retirado";

        celdaEstado.appendChild(estado);

        const celdaAccion = document.createElement("td");

        const boton = document.createElement("button");

        if (usuario.activo) {

            boton.textContent = "Retirar acceso";
            boton.className = "btn-retirar";

            boton.addEventListener("click", () => {

                usuarioPendiente = usuario.id;

                document.getElementById("mensajeConfirmacion").textContent =
                    `¿Deseas retirar el acceso de ${usuario.nombre}?`;

                document.getElementById("modalConfirmacion")
                    .classList.add("abierto");

            });

        } else {

            boton.textContent = "Reactivar";
            boton.className = "btn-reactivar";

            boton.addEventListener("click", () => {

                usuario.activo = true;

                guardarDatos(CLAVES.usuarios, usuarios);

                mostrarUsuarios(
                    document.getElementById("buscarUsuario").value
                );

                actualizarEstadisticas();

            });

        }

        celdaAccion.appendChild(boton);

        fila.append(
            celdaNombre,
            celdaCorreo,
            celdaRol,
            celdaEstado,
            celdaAccion
        );

        tabla.appendChild(fila);

    });

}


// BUSCADOR
document.getElementById("buscarUsuario").addEventListener("input", function() {

    mostrarUsuarios(this.value);

});


// CONFIRMAR RETIRO DE ACCESO
document.getElementById("confirmarRetiro").addEventListener("click", () => {

    if (usuarioPendiente === null) return;

    usuarios = usuarios.map(usuario => {

        if (usuario.id === usuarioPendiente) {

            return {
                ...usuario,
                activo: false
            };

        }

        return usuario;

    });

    guardarDatos(CLAVES.usuarios, usuarios);

    mostrarUsuarios(
        document.getElementById("buscarUsuario").value
    );

    actualizarEstadisticas();

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
// INFORMACIÓN DEL SITIO
// =====================================

function cargarInformacion() {

    document.getElementById("nombreSitio").value = informacion.nombre;

    document.getElementById("fraseSitio").value = informacion.frase;

    document.getElementById("descripcionSitio").value =
        informacion.descripcion;

    document.getElementById("correoSitio").value =
        informacion.correo || "";

    actualizarVistaPrevia();

}


// VISTA PREVIA
function actualizarVistaPrevia() {

    document.getElementById("previewNombre").textContent =
        document.getElementById("nombreSitio").value;

    document.getElementById("previewFrase").textContent =
        document.getElementById("fraseSitio").value;

    document.getElementById("previewDescripcion").textContent =
        document.getElementById("descripcionSitio").value;

}

[
    "nombreSitio",
    "fraseSitio",
    "descripcionSitio"
].forEach(id => {

    document.getElementById(id).addEventListener(
        "input",
        actualizarVistaPrevia
    );

});


// GUARDAR INFORMACIÓN
document.getElementById("formSitio").addEventListener("submit", event => {

    event.preventDefault();

    informacion = {

        nombre: document.getElementById("nombreSitio").value.trim(),

        frase: document.getElementById("fraseSitio").value.trim(),

        descripcion: document.getElementById("descripcionSitio").value.trim(),

        correo: document.getElementById("correoSitio").value.trim()

    };

    guardarDatos(CLAVES.sitio, informacion);

    actualizarVistaPrevia();

    mostrarMensaje(
        "mensajeSitio",
        "¡La información se guardó correctamente!"
    );

});


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

document.getElementById("anio").textContent =
    new Date().getFullYear();

cargarInformacion();

mostrarTemas();

mostrarUsuarios();

actualizarEstadisticas();
