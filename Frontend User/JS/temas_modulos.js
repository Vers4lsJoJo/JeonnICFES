
// ======================================
// 1. IDENTIFICAR LA PÁGINA ACTUAL
// ======================================

const moduloActual = document.body.dataset.modulo;
const botonVerTemas = document.getElementById("btnVerTemas");

// ======================================
// 2. SI ESTAMOS EN UN MÓDULO
// ======================================

if (botonVerTemas) {

    botonVerTemas.addEventListener("click", () => {

        if (!moduloActual) {
            alert("No se pudo identificar el módulo.");
            return;
        }

        const direccion = "../../../Seg Frontend/HTML/temas.html?modulo=" +            
        encodeURIComponent(moduloActual);

        window.location.href = direccion;
    });

}

// ======================================   
// 3. SI ESTAMOS EN TEMAS.HTML
// ======================================

const listaTemas = document.getElementById("listaTemasModulo");
const tituloModulo = document.getElementById("tituloModulo");
const contadorTemas = document.getElementById("contadorTemas");

if (listaTemas) {

    const parametros = new URLSearchParams(window.location.search);
    const moduloSeleccionado = parametros.get("modulo");

    if (tituloModulo) {
        tituloModulo.textContent = moduloSeleccionado
            ? "Temas de " + moduloSeleccionado
            : "Temas del módulo";
    }

    async function cargarTemas() {

        if (!moduloSeleccionado) {
            listaTemas.textContent = "No se indicó ningún módulo.";
            return;
        }

        try {

            const respuesta = await fetch(
                "../../PHP/temas_modulos.php?modulo=" +
                encodeURIComponent(moduloSeleccionado),
                { credentials: "same-origin" }
            );
            
            if (!respuesta.ok) {
                throw new Error("No se pudieron consultar los temas.");
            }

            const temas = await respuesta.json();

            const temasFiltrados = temas.filter(tema =>
                (tema.modulo || "").trim().toLowerCase() ===
                moduloSeleccionado.trim().toLowerCase()
            );

            listaTemas.innerHTML = "";

            if (contadorTemas) {
                contadorTemas.textContent =
                    temasFiltrados.length + " temas";
            }

            if (temasFiltrados.length === 0) {
                listaTemas.textContent =
                    "Todavía no hay temas disponibles.";
                return;
            }

            temasFiltrados.forEach(tema => {

                const tarjeta = document.createElement("article");
                tarjeta.className = "tarjeta-tema";

                const icono = document.createElement("div");
                icono.className = "icono-tema";
                icono.textContent = "📘";

                const titulo = document.createElement("h3");
                titulo.textContent = tema.titulo;

                const descripcion = document.createElement("p");
                descripcion.textContent =
                    tema.descripcion || "Sin descripción disponible.";

                tarjeta.appendChild(icono);
                tarjeta.appendChild(titulo);
                tarjeta.appendChild(descripcion);

                if (tema.archivo) {

                    const enlace = document.createElement("a");

                    enlace.className = "archivo-tema";
                    enlace.href = "../../Archivos/temas/" +
                        encodeURIComponent(tema.archivo);

                    enlace.textContent =
                        tema.archivo_nombre || "Ver archivo";

                    enlace.target = "_blank";
                    enlace.rel = "noopener noreferrer";

                    tarjeta.appendChild(enlace);
                }

                listaTemas.appendChild(tarjeta);

            });

        } catch (error) {

            console.error(error);
            listaTemas.textContent =
                "Error al cargar los temas. Revisa la conexión con PHP.";
        }
    }

    cargarTemas();
}
