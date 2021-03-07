// Ejercicio 10: Validador de nombres de usuario

// Me rindo intentando sacar una expresion que haga todo eso
function isValidUsername (nombre: string): boolean {
  let size: number = nombre.length;

  if ((size >= 4) && (size <= 30)) {
    if (/^(?!_).*(?<!_)$/g.test(nombre)) {
      if ( /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$_-])/g.test(nombre)) {
        if (/(?![a-zA-Z]{3,})(?![0-9]{3,})(?![$_-]{3,})/g.test(nombre)) {

        }
      }
      
      return true;
    }
  }
  return false;
}

console.log(isValidUsername('jola_'));