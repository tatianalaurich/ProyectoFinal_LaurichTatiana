const perfumes = [
    { nombre: "Ekos Castaña", tipo: "cremoso" },
    { nombre: "Ekos Açaí", tipo: "fresco" },
    { nombre: "Ekos Pitanga", tipo: "citrico" },
    { nombre: "Ekos Maracuyá", tipo: "frutal" },
    { nombre: "Ekos Cacau", tipo: "natural" },
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
    { nombre: "Máscara de Pestañas", tipo: "intenso" },
    { nombre: "Gloss labial", tipo: "frutal" }
];
function mostrarBienvenida(nombre) {
    return `¡Hola ${nombre}! Estas son tus recomendaciones:`;
}
function buscarPorTipo(lista, tipoBuscado) {
    return lista.filter(item =>
    item.tipo.toLowerCase().includes(tipoBuscado.toLowerCase())
    );
}