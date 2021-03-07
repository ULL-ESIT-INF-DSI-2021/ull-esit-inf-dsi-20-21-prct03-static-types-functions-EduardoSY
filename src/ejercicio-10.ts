// Ejercicio 10: Validador de nombres de usuario

// Me rindo intentando sacar una expresion que haga todo eso
function isValidUsername(nombre: string): boolean {
  let size: number = nombre.length;

  if ((size >= 4) && (size <= 30)) {
    if (/^(?!_).*(?<!_)$/g.test(nombre)) {
      if ( /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$_-])/g.test(nombre)) {
        if (!/[a-z][a-z][a-z]/g.test(nombre) &&
        !/[A-Z][A-Z][A-Z]/g.test(nombre) &&
        !/[0-9][0-9][0-9]/g.test(nombre) && !/[$_-][$_-][$_-]/g.test(nombre)) {
          return true;
        }
      }
    }
  }
  return false;
}
console.log(isValidUsername('_esTe$usERNo_vale'));
console.log(isValidUsername('EstE_us3r-VAle'));
console.log(isValidUsername('u__hello$122__'));