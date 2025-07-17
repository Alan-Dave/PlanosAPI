// Función para obtener datos de las APIs
async function obtenerDatosDeApis() {
    const urls = [
        // URLs de ejemplo, deben ser reemplazadas por las correctas
        "https://overpass-api.de/api/planos", 
        "https://mapbox.com/api/planos",
        "https://developers.arcgis.com/api/planos",
        "https://forge.autodesk.com/api/planos"
    ];
    let planos = [];
    for (const url of urls) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            // Suponiendo que data tiene los campos requeridos
            planos.push({
                nombre: data.nombre || "Sin nombre",
                descripcion: data.descripcion || "Sin descripción",
                imagen: data.imagen || "imagen_default.png"
            });
        } catch (error) {
            console.error("Error al obtener datos de la API:", url, error);
        }
    }
    return planos;
}

// Evento submit para el formulario de búsqueda
const form = document.querySelector("form");
form.addEventListener("submit", async function(event) {
    event.preventDefault();
    const buscador = document.getElementById("buscador");
    const valor = buscador.value.trim().toLowerCase();
    if (valor === "") {
        alert("Por favor, ingresa un plano para buscar.");
        return;
    }

    // Obtener los datos de las APIs
    const planos = await obtenerDatosDeApis();
    // Mostrar en consola los nombres de hasta 5 planos obtenidos
    console.log("Nombres de los planos obtenidos:");
    planos.slice(0, 5).forEach((plano, i) => {
        console.log(`${i + 1}: ${plano.nombre}`);
    });

    const resultado = planos.find(plano => valor.includes(plano.nombre.toLowerCase()));
    const lista = document.querySelector(".main ul");
    // Limpiar resultados anteriores
    lista.innerHTML = "";

    if (resultado) {
        alert(`Plano encontrado: ${resultado.nombre}\n${resultado.descripcion}`);
        // Crear el elemento de la lista
        const li = document.createElement("li");
        const h4 = document.createElement("h4");
        h4.textContent = `Plano de ${resultado.nombre.charAt(0).toUpperCase() + resultado.nombre.slice(1)}`;
        const p = document.createElement("p");
        p.textContent = `Descripción: ${resultado.descripcion}`;
        li.appendChild(h4);
        li.appendChild(p);
        lista.appendChild(li);
    } else {
        alert("No se encontró ningún plano con ese nombre.");
        const li = document.createElement("li");
        li.textContent = "No se encontró ningún plano con ese nombre.";
        lista.appendChild(li);
    }
});
