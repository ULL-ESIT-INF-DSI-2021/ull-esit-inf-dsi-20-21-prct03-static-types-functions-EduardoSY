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
- -Excepto cada año que es divisible por 100.
- - - Al menos que el año también sea divisible por 400.

### Ejercicio 2
A mi criterio este ha sido uno de los ejercicios más complejos. En este caso se nos pide transformar un número de notación decimal a notación factorádica.

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
