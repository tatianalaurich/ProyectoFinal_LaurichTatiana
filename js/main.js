const perfumes = [
    { nombre: "Ekos Castaña", tipo: "cremoso" },
    { nombre: "Ekos Açaí", tipo: "fresco" },
    { nombre: "Ekos Pitanga", tipo: "citrico" },
    { nombre: "Ekos Maracuyá", tipo: "frutal" },
    { nombre: "Essencial Exclusivo", tipo: "intenso" }
];
const cremas = [
    { nombre: "Pulpa Castaña", tipo: "cremoso" },
    { nombre: "Néctar Maracuyá", tipo: "frutal" },
    { nombre: "Manteca Ucuuba", tipo: "intenso" },
    { nombre: "Néctar Pitanga", tipo: "citrico" }
];
const maquillaje = [
    { nombre: "Labial Una", tipo: "intenso" },
    { nombre: "Base Fluida", tipo: "natural" },
    { nombre: "Máscara de Pestañas", tipo: "intenso" }
];

function mostrarBienvenida(nombre) {
    return `¡Hola ${nombre}! Estas son tus recomendaciones:`;
}
function buscarPorTipo(lista, tipoBuscado) {
    return lista.filter(item => item.tipo.toLowerCase().includes(tipoBuscado.toLowerCase()));
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
    } else {
        const sinResultados = document.createElement("p");
        sinResultados.textContent = "No encontramos productos que coincidan con tu búsqueda.";
        resultado.appendChild(sinResultados);
    }
}
document.getElementById("form-recomendador").addEventListener("submit", function (e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const categoria = document.getElementById("categoria").value;
    const tipo = document.getElementById("tipo").value.trim();
    if (!nombre || !categoria || !tipo) return;
    let productos = [];
    switch (categoria) {
        case "perfume":
            productos = buscarPorTipo(perfumes, tipo);
            break;
        case "crema":
            productos = buscarPorTipo(cremas, tipo);
            break;
        case "maquillaje":
            productos = buscarPorTipo(maquillaje, tipo);
            break;
    }
    mostrarResultados(nombre, productos);
});
document.getElementById("ver-ultima").addEventListener("click", () => {
    const data = localStorage.getItem("ultimaRecomendacion");
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    if (data) {
        const productos = JSON.parse(data);
        const lista = document.createElement("ul");
        productos.map(prod => prod.nombre ?? prod).forEach(nombre => {
            const li = document.createElement("li");
            li.textContent = nombre;
            lista.appendChild(li);
        });
        resultado.innerHTML = "<p>Última recomendación guardada:</p>";
        resultado.appendChild(lista);
    } else {
        resultado.innerHTML = "<p>No hay historial guardado.</p>";
    }
});
document.getElementById("borrar-historial").addEventListener("click", () => {
    localStorage.clear();
    document.getElementById("resultado").innerHTML = "<p>Historial eliminado.</p>";
});
