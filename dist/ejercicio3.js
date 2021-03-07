// Ejercicio 3. Validar cadenas
function isValid(cadenita) {
    if (cadenita.length === 0) {
        return true;
    }
    const outputmatch = cadenita.match(/[\d]+|\D+/g);
    let separado = outputmatch;
    for (let i = 0; i < separado.length;) {
        let aux = parseInt(separado[i], 10);
        if (aux != separado[i + 1].length) {
            return false;
        }
        i += 2;
    }
    return true;
}
let cadena = "3Hey5Amigo";
console.log(isValid(cadena) ? "Aceptada" : "No aceptada");
let cadena2 = "5Esto5Falla";
console.log(isValid(cadena2) ? "Aceptada" : "No aceptada");
