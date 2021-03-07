// Ejercicio 7: Encontrar siguiente numero mayor
function nextGreater(numero) {
    let numstr = numero.toString();
    let num = numstr.split('');
    let i = 0;
    for (i = num.length - 1; i > 0; i--) {
        if (+num[i] > +num[i - 1]) {
            break;
        }
    }
    if (i === 0) {
        // Significa que esta ordenado decreciente y no hay mayor posible.
        return -1;
    }
    let pivot = num[i - 1];
    let menor = i;
    // Buscamos el menor del lado derecho del pivote.
    for (let j = num.length - 1; j > i; j--) {
        if ((+num[j] > +pivot) && (+num[j] < +num[menor])) {
            menor = j;
        }
    }
    // Swap
    [num[i - 1], num[menor]] = [num[menor], num[i - 1]];
    numstr = num.join('');
    // Ordenamos el lado derecho de la pos del pivote
    let substring = numstr.substr(i);
    let aux = substring.split('').sort();
    substring = aux.join('');
    // Unimos el lado derecho ordenado al resto del numero
    return +(numstr.substring(0, i).concat(substring));
}
console.log(nextGreater(513));
console.log(nextGreater(2017));
console.log(nextGreater(6001));
console.log(nextGreater(9));
console.log(nextGreater(111));
console.log(nextGreater(321));
