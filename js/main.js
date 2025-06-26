const productos = [
    { nombre: "Ekos Castaña", tipo: "cremoso" },
    { nombre: "Ekos Açaí", tipo: "fresco" },
    { nombre: "Ekos Tukuma", tipo: "amaderado" },
    { nombre: "Ekos Pitanga", tipo: "cítrico" },
    { nombre: "Essencial Exclusivo", tipo: "intenso" }
]

function recomendarProducto(preferencia) {
    let recomendados = []
    for (let producto of productos) {
        if (producto.tipo.toLowerCase() === preferencia.toLowerCase()) {
        recomendados.push(producto.nombre)
        }
    }
        if (recomendados.length > 0) {
    alert("Te recomendamos: " + recomendados.join(", "))
    } 
        else {
    alert("No tenemos productos para esa preferencia. Probá con: cremoso, fresco, amaderado, cítrico o intenso.")
    }
}
//empieza el simulador
alert("Bienvenida/o al recomendador de productos Natura")
    let seguir = true;
    while (seguir) {
        let gusto = prompt("¿Qué estilo de fragancia te gusta? (cremoso, fresco, amaderado, cítrico o intenso)")
        if (gusto) {
            recomendarProducto(gusto)
        }
        seguir = confirm("¿Querés hacer otra recomendación?")
        
}
console.log("Gracias por usar el simulador de productos Natura.")
alert("¡Gracias por usar el simulador de productos Natura!")