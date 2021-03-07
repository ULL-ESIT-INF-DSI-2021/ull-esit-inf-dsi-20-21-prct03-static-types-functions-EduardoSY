// Ejercicio 6: Comprobar ISBN validos

function isValidISBN(cadena: string): boolean {
  let separada: string[] = cadena.replace(/-/g, '').split('');
  let aux: number = 10;
  let result: number = 0;
  if (separada.length != 10) {
    return false;
  }
  for (let value of separada) {
    if (/(x|X)/.test(value)) {
      value = '10';
    } else if (!(/[0-9]/.test(value))) {
      return false;
    }
    result += parseInt(value, 10) * aux;
    aux--;
  }
  if ((result % 11) == 0) {
    return true;
  }
  return false;
}

console.log(isValidISBN('3-598-21508-8')?"Acepta":"No acepta");
console.log(isValidISBN('6-588-21507-X')?"Acepta":"No acepta");
console.log(isValidISBN('359821507X')?"Acepta":"No acepta");
console.log(isValidISBN('359821507F')?"Acepta":"No acepta");
console.log(isValidISBN('11')?"Acepta":"No acepta");