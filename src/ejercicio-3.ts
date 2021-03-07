// Ejercicio 3. Validar cadenas

function isValid(cadenita: string): boolean {
  if (cadenita.length === 0) {
    return true;
  }
  const outputmatch: RegExpMatchArray | null = cadenita.match(/[\d]+|\D+/g);
  let separado: string[] = outputmatch as RegExpMatchArray;
  for (let i: number = 0; i < separado.length;) {
    let aux: number = parseInt(separado[i], 10);
    if (aux != separado[i+1].length) {
      return false;
    }
    i+=2;
  }
  return true;
}
let cadena: string = "3Hey5Amigo";
console.log(isValid(cadena)?"Aceptada":"No aceptada");
let cadena2: string = "5Esto5Falla";
console.log(isValid(cadena2)?"Aceptada":"No aceptada");
