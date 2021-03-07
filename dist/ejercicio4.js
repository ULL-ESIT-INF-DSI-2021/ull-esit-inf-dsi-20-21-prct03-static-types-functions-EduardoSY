// Ejercicio 4: Pasar de camelCase a snake_case y viceversa
function fromCamelToSnakeCase(cadena) {
    if (/[A-Z]/.test(cadena[0])) {
        cadena = cadena.replace(cadena[0], cadena[0].toLowerCase());
    }
    return cadena.replace(/([A-Z])/g, '_$1').toLowerCase();
}
function fromSnakeToCamelCase(cadena) {
    if (/[A-Z]/.test(cadena[0])) {
        cadena = cadena.toLowerCase();
    }
    return cadena.replace(/([-_]\w)/g, function (match) {
        return match[1].toUpperCase();
    });
}
let test = 'cadenaTestCamelToSnake';
console.log(fromCamelToSnakeCase(test));
let test2 = 'CadenaTest2CamelToSnake';
console.log(fromCamelToSnakeCase(test2));
let test3 = 'cadena_test_snake_to_camel';
console.log(fromSnakeToCamelCase(test3));
