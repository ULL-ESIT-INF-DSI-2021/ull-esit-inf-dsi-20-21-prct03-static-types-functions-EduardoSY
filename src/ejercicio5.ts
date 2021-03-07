// Ejercicio 5: Chuck Norris quiere en una linea de codigo:
// 1. Eliminar "a" y "e" de las palabras
// 2. Separar, ordenar esas palabras por orden alfabético y reunirlas
// 3. Que la cadena vacia muestre "Broken!"

function onePunch(cadena: string): string {
  return ((cadena.length === 0)?
  'Broken!':cadena.replace( /[ae]/g, '').split(' ').sort().join(' '));
}

console.log(onePunch('Beard Jeans Hairbrush Knuckleduster Sand'));
console.log(onePunch('Snot Snow Soda Tank Beard'));
console.log(onePunch(''));