# Práctica 3 - Tipos de datos estáticos y funciones
* Elaborado por Eduardo Da Silva Yanes

## 1. Introduccion
Para esta tercera práctica vamos a programar en Typescript. Se nos proponen una serie de ejercicios en en esta [guia](https://ull-esit-inf-dsi-2021.github.io/prct03-types-functions/) que deberemos resolver. El objetivo es familiarizarnos con el lenguaje y aprender a manejar los distintos tipos de datos y funciones que nos ofrece Typescript.

## Ejercicios:

### Ejercicio 1
En este primer ejercicio se nos plantea calcular qué años son bisiestos.

```typescript
function isLeapYear(year: number): string {
  if ((year % 4) === 0) {
    if (((year % 100) != 0) || ((year % 400) === 0)) {
      return ("Es bisiesto");
    }
  }
  return ("No es bisiesto");
}

let fecha: number = 1961;
let fecha2: number = 1992;
console.log(isLeapYear(fecha));
console.log(isLeapYear(fecha2));
```

La funcion **isLeapYear** recibe el numero a comprobar. Luego, en base a unas reglas que se nos dice en el enunciado, hacemos las condiciones que nos permiten filtrar los años bisiestos de los no bisiestos.
Esas reglas son:
- Cada año que es divisible por 4.
- - Excepto cada año que es divisible por 100.
- - - Al menos que el año también sea divisible por 400.

### Ejercicio 2
A mi criterio este ha sido uno de los ejercicios más complejos, no tanto por la implementación sino por el propio concepto de notación factorádica. En este caso se nos pide transformar un número de notación decimal a notación factorádica. Para entender el concepto de factorádico es recomendable ver [este articulo de wikipedia](https://en.wikipedia.org/wiki/Factorial_number_system).

```typescript
function factorialRecur(numero: number): number {
  if (numero == 0) {
    return 1;
  }
  return (numero * factorialRecur(numero - 1));
}

function decimalToFactorial(numero: number): string {
  let resultado: string = '';
  let iter: number = 1;
  while (numero != 0) {
    resultado = (numero % iter).toString() + resultado;
    numero = Math.floor(numero / iter);
    iter ++;
  }
  return resultado;
}

function factorialToDecimal(numero: string): number {
  let resultado: number = 0;
  let aux: number = 0;
  for ( let i: number = numero.length - 1; i >= 0; i--) {
    resultado += parseInt(numero[aux]) * factorialRecur(i);
    aux++;
  }
  return resultado;
}

console.log('463 a factorial -> ' + decimalToFactorial(463));
console.log('341010 a decimal -> ' + factorialToDecimal('341010'));

```

La primera función que encontramos es **factorialRecur**. Su función es simplemente calcular el factorial de un número de manera recursiva.

La segunda función es **decimalToFactorial**. Como su nombre indica nos permite pasar de decimal a notación factorádica dado un número. Tal y como nos pide el enunciado, el valor de retorno debe ser una cadena.
Para implementar el algoritmo seguimos esta página de [wikipedia](https://en.wikipedia.org/wiki/Factorial_number_system).
Lo que debemos hacer es obtener el módulo de la división entre el numero decimal y los divisores. El divisor ha de comenzar en uno. Ese resto de la división será parte del resultado en notación factorádica.
Una vez tenemos el resto, debemos obtener el cociente e incrementar 1 el divisor, tal y como se nos muestra en el ejemplo de Wikipedia. Repetimos el proceso hasta que el cociente sea 0.

La tercera y última función, **factorialToDecimal**, hace justamente lo contrario; pasar de factorádico a decimal. Como sabemos de la función anterior, un número en notación factorádica se representa de la siguiente manera: 3 x 5! + 4 x 4! + 1 x 3! + 0 x 2! + 1 x 1! + 0 x 0!. El valor de la derecha siempre estará multiplicado por 0! y a medida que avanzamos hacia la izquierda el valor del factorial va aumentando de uno en uno. Esto mismo es lo que implementaremos.

Cremos una variable auxiliar que será la que indique el valor del factorial. En el _bucle for_ nos colocamos en la posición de la derecha del string que representa al número factorádico. Lo siguiente que hacemos es pasar el caracter del string a un valor numérico para poder multiplicarlo por su factorial correspondiente e ir acumulando la suma de estas operaciones. Incrementamos el valor del factorial y pasamos a la siguiente iteración, desplazandonos una posición a la izquierda. Este proceso se repite a lo largo de todo el número.
Una vez finalizado devolvemos la suma que hemos ido acumulando. Ese es nuestro numero en decimal.

