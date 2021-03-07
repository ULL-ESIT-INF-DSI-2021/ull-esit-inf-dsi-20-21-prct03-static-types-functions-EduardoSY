// Ejercicio 2: Pasar de decimal a notacion factorial y viceversa.
function factorialRecur(numero) {
    if (numero == 0) {
        return 1;
    }
    return (numero * factorialRecur(numero - 1));
}
function decimalToFactorial(numero) {
    let resultado = '';
    let iter = 1;
    while (numero != 0) {
        resultado = (numero % iter).toString() + resultado;
        numero = Math.floor(numero / iter);
        iter++;
    }
    return resultado;
}
function factorialToDecimal(numero) {
    let resultado = 0;
    let aux = 0;
    for (let i = numero.length - 1; i >= 0; i--) {
        resultado += parseInt(numero[aux]) * factorialRecur(i);
        aux++;
    }
    return resultado;
}
console.log('463 a factorial -> ' + decimalToFactorial(463));
console.log('341010 a decimal -> ' + factorialToDecimal('341010'));
