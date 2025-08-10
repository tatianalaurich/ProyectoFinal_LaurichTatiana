let productos = [];
fetch('./data/productos.json')
    .then(response => {
        if (!response.ok) {
        throw new Error(`Error al cargar el JSON: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        productos = data;
    console.log("Productos cargados:", productos);
    })
    .catch(error => {
        console.error("Hubo un problema con la carga de productos:", error);
    })
    .finally(() => {
    console.log("Intento de carga finalizado");
});
async function obtenerProductosConFallback(categoria, tipo) {
    try {
        const res = await fetch('./data/productos.json');
        if (!res.ok) throw new Error('No se pudo cargar productos.json');
        const data = await res.json();
        const filtrados = data.filter(p =>
            p.categoria === categoria &&
            p.tipo.toLowerCase().includes(tipo.toLowerCase())
        );
        return filtrados;
        } catch (error) {
            let lista = [];
            switch (categoria) {
                case 'perfume':
                    lista = perfumes;
                    break;
                case 'crema':
                    lista = cremas;
                    break;
                case 'maquillaje':
                    lista = maquillaje;
                    break;
                default:
            lista = [];
        }
    return buscarPorTipo(lista, tipo);
        } finally {
    }
}
function mostrarResultados(nombre, productos) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    const saludo = document.createElement("p");
    saludo.textContent = mostrarBienvenida(nombre);
    resultado.appendChild(saludo);
    if (productos.length > 0) {
        const lista = document.createElement("ul");
        productos.map(prod => prod.nombre).forEach(nombre => {
            const li = document.createElement("li");
            li.textContent = nombre;
            lista.appendChild(li);
    });
        resultado.appendChild(lista);
        localStorage.setItem("ultimaRecomendacion", JSON.stringify(productos));
        Swal.fire({
            icon: "success",
            title: "¡Recomendación guardada!",
            text: "Tus productos fueron almacenados en el historial."
        });
    } else {
        const sinResultados = document.createElement("p");
        sinResultados.textContent = "No encontramos productos que coincidan con tu búsqueda.";
        resultado.appendChild(sinResultados);
    }
}
document.getElementById("form-recomendador").addEventListener("submit", async function (e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const categoria = document.getElementById("categoria").value;
    const tipo = document.getElementById("tipo").value.trim();
    if (!nombre || !categoria || !tipo) return;
    try {
        const productos = await obtenerProductosConFallback(categoria, tipo);
        mostrarResultados(nombre, productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
});
document.getElementById("borrar-historial").addEventListener("click", () => {
    Swal.fire({
        title: "¿Seguro?",
        text: "Esta acción eliminará tu historial.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            document.getElementById("resultado").innerHTML = "<p>Historial eliminado.</p>";
            Swal.fire("¡Listo!", "Historial eliminado.", "success");
        }
    });
});
document.getElementById("ver-ultima").addEventListener("click", () => {
    const data = localStorage.getItem("ultimaRecomendacion");
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    if (!data) {
        resultado.innerHTML = "<p>No hay historial guardado.</p>";
        return;
    }
    try {
        const productos = JSON.parse(data);
        const lista = document.createElement("ul");
        productos.map(p => p?.nombre ?? p).forEach(nombre => {
        const li = document.createElement("li");
        li.textContent = nombre;
        lista.appendChild(li);
    });
        resultado.innerHTML = "<p>Última recomendación guardada:</p>";
        resultado.appendChild(lista);
        } catch (e) {
        console.error("Error leyendo el historial:", e);
        resultado.innerHTML = "<p>No se pudo leer el historial.</p>";
    }
});
async function obtenerProductosJSON() {
    try {
        const res = await fetch("./data/productos.json");
            if (!res.ok) {
            throw new Error("No se pudo cargar la base de datos de productos");
        }
        const data = await res.json();
            return data;
        } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message || "No se pudo cargar la base de productos"
    });
        return [];
        } finally {
    }
}
function promesaProductos(tipo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (tipo && tipo.length > 0) {
                resolve(`Filtro aplicado: ${tipo}`);
            } else {
                reject("No se especificó tipo de producto");
            }
        }, 500);
    });
}

