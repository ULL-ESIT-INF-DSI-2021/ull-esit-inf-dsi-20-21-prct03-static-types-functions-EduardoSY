# Práctica 3 - Tipos de datos estáticos y funciones
* Elaborado por Eduardo Da Silva Yanes

## 1. Introducción
Para esta tercera práctica vamos a programar en Typescript. Se nos proponen una serie de ejercicios en en esta [guia](https://ull-esit-inf-dsi-2021.github.io/prct03-types-functions/) que deberemos resolver. El objetivo es familiarizarnos con el lenguaje y aprender a manejar los distintos tipos de datos y funciones que nos ofrece Typescript.

## 2. Pasos previos
Antes de comenzar a programar en Typescript debemos crear organizar correctamente nuestro proyecto, creando los directorios y ficheros de configuración correspondientes. Vamos a seguir esta [Guía de creación de proyecto](https://ull-esit-inf-dsi-2021.github.io/typescript-theory/typescript-project-setup.html) para organizar nuestro trabajo.

## 3. Ejercicios:

### Ejercicio 1

[Acceso al código fuente](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct03-static-types-functions-EduardoSY/blob/master/src/ejercicio-1.ts)

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

**OUTPUT**
```
No es bisiesto
Es bisiesto
```

La función **isLeapYear** recibe el numero a comprobar. Luego, en base a unas reglas que se nos dice en el enunciado, hacemos las condiciones que nos permiten filtrar los años bisiestos de los no bisiestos.
Esas reglas son:
- Cada año que es divisible por 4.
  - Excepto cada año que es divisible por 100.
    - Al menos que el año también sea divisible por 400.

### Ejercicio 2

[Acceso al código fuente](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct03-static-types-functions-EduardoSY/blob/master/src/ejercicio-2.ts)

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

**OUTPUT**
```
463 a factorial -> 341010
341010 a decimal -> 463
```

La primera función que encontramos es **factorialRecur**. Su función es simplemente calcular el factorial de un número de manera recursiva.

La segunda función es **decimalToFactorial**. Como su nombre indica nos permite pasar de decimal a notación factorádica dado un número. Tal y como nos pide el enunciado, el valor de retorno debe ser una cadena.
Para implementar el algoritmo seguimos esta página de [wikipedia](https://en.wikipedia.org/wiki/Factorial_number_system).
Lo que debemos hacer es obtener el módulo de la división entre el numero decimal y los divisores. El divisor ha de comenzar en uno. Ese resto de la división será parte del resultado en notación factorádica.
Una vez tenemos el resto, debemos obtener el cociente e incrementar 1 el divisor, tal y como se nos muestra en el ejemplo de Wikipedia. Repetimos el proceso hasta que el cociente sea 0.

La tercera y última función, **factorialToDecimal**, hace justamente lo contrario; pasar de factorádico a decimal. Como sabemos de la función anterior, un número en notación factorádica se representa de la siguiente manera: 3 x 5! + 4 x 4! + 1 x 3! + 0 x 2! + 1 x 1! + 0 x 0!. El valor de la derecha siempre estará multiplicado por 0! y a medida que avanzamos hacia la izquierda el valor del factorial va aumentando de uno en uno. Esto mismo es lo que implementaremos.

Cremos una variable auxiliar que será la que indique el valor del factorial. En el _bucle for_ nos colocamos en la posición de la derecha del string que representa al número factorádico. Lo siguiente que hacemos es pasar el caracter del string a un valor numérico para poder multiplicarlo por su factorial correspondiente e ir acumulando la suma de estas operaciones. Incrementamos el valor del factorial y pasamos a la siguiente iteración, desplazandonos una posición a la izquierda. Este proceso se repite a lo largo de todo el número.
Una vez finalizado devolvemos la suma que hemos ido acumulando. Ese es nuestro numero en decimal.

### Ejercicio 3

[Acceso al código fuente](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct03-static-types-functions-EduardoSY/blob/master/src/ejercicio-3.ts)

En este ejercicio debemos validar cadenas que tienen la forma Xsubstring1Ysubstring2... siendo X e Y numeros y substring1 y substring2 cadenas de letras. Para que una cadena sea válida debe cumplirse lo siguiente:
- Los mensajes solo tienen números y letras.
- Los números pueden tener varios dígitos. Por ejemplo, la cadena “4code10helloworld” es un mensaje válido.
- Cada número debe corresponder con la longitud de la subcadena que se encuentra a continuación, en cualquier otro caso el mensaje no será válido.
- La cadena vacía se considera un mensaje válido.

Para resolver todo lo anterior vamos a implementar la funcion **isValid**.
```typescript
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
```

**OUTPUT**
```
Aceptada
No aceptada
```

Recibimos como parámetro un string que es la cadena a analizar y como resultado devolveremos un booleano true en caso de ser valida o false si no válida.
Primero analizamos el caso más sencillo. Si es una cadena vacia la damos por válida. 

En el caso de que no sea vacia vamos a analizarla. Para ello vamos a dividir la cadena separando las subcadenas de números y de letras. Para ello hacemos uso de una expresión regular, **/[\d]+|\D+/g** que busca las coincidencias cuando hay un grupo de número o grupo de letras. Al añadir la opción **g**, match nos devuelve un array con todos los emparejamientos.

```typescript
//ATENCION A ESTAS DOS LINEAS
const outputmatch: RegExpMatchArray | null = cadenita.match(/[\d]+|\D+/g);
let separado: string[] = outputmatch as RegExpMatchArray;
```
Como no podemos asignar directamente la salida de la función **match** a un **string[]** debemos guardarla primero en una variable o constante tipo **RegExpMatchArray | null** (tal cual nos dice el compilador) y luego, en la linea siguiente, indicarle al compilador que trate a ese string[] como un RegExpMatchArray.

Finalmente pasamos las cadenas numericas a números y comparamos su valor con la longutud de la cadena siguiente. Recordemos que para que sea válida la palabra los números deben corresponder a la longitud de la siguiente subcadena. Analizamos de esta manera todos los pares. Si encontramos algún par incorrecto devolveremos false. En caso de que todo esté correcto devolvemos true.

### Ejercicio 4

[Acceso al código fuente](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct03-static-types-functions-EduardoSY/blob/master/src/ejercicio-4.ts)

Vamos a implementar un conversor de estilo. Debemos pasar de camelCase a snake_case y viceversa. Además de esto debemos tener en cuenta que el texto de salida **siempre** debe comenzar por minúscula.

```typescript
function fromCamelToSnakeCase(cadena: string): string {
  if (/[A-Z]/.test(cadena[0])) {
    cadena = cadena.replace(cadena[0], cadena[0].toLowerCase());
  }
  return cadena.replace( /([A-Z])/g, '_$1').toLowerCase();
}

function fromSnakeToCamelCase(cadena: string): string {
  if (/[A-Z]/.test(cadena[0])) {
    cadena = cadena.toLowerCase();
  }
  return cadena.replace(/([_]\w)/g,
      function(match: string) {
        return match[1].toUpperCase();
      });
}

let test: string = 'cadenaTestCamelToSnake';
console.log(fromCamelToSnakeCase(test));

let test2: string = 'CadenaTest2CamelToSnake';
console.log(fromCamelToSnakeCase(test2));

let test3: string = 'cadena_test_snake_to_camel';
console.log(fromSnakeToCamelCase(test3));
```

**OUTPUT**
```
cadena_test_camel_to_snake
cadena_test2_camel_to_snake
cadenaTestSnakeToCamel
```

La primera función es **fromCamelToSnakeCase**. Lo primero que hacemos es analizar la primera letra. En caso de que sea mayúscula la pasamos a minúscula. Si no hicieramos esto el resultado de pasarle **Hola** a esta función sería **_hola** y eso no es lo que queremos.

Lo siguiente que hacemos es reemplazar las letras mayúsculas por su correspondiente minúscula precedida de una \_. Para esto usamos la función **replace** junto a esta expresión regular: /([A-Z])/g. Lo que hace es encontrar todos los matches con letras mayúsculas en la cadena. Con '\_$1' es la cadena por la que sustituimos. $1 corresponde al match hecho por la expresión regular. Por tanto, lo que estamos haciendo es añadir una _ antes de cada mayúscula. Finalmente transformamos todo el string a minúsculas y retornamos la cadena resultante.

La siguiente función es **fromSnakeToCamelCase**. Al igual que el anterior, comprobamos que la primera no sea mayúscula para que el output no empieze por mayúscula también.
Hacemos uso de la función **replace** otra vez. En este caso tenemos como primer parámetro una expresión que nos permite encontrar aquellas palabras que precedidas de \_. Como segundo parámetro tenemos una función que devolvería la primera letra de ese emparejamiento en mayúscula.
Con todo esto ya tendríamos nuestra cadena en CamelCase.

### Ejercicio 5

[Acceso al código fuente](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct03-static-types-functions-EduardoSY/blob/master/src/ejercicio-5.ts)

En este caso Chuck Norris quiere que eliminemos las letras a y e de una cadena, la dividamos por palabras, las ordenemos y luego las volvamos a unir. Todo en una linea. Y si es una cadena vacía Chuck le mete un puñetazo tan fuerte que debe retornar la palabra **Broken!**.

```typescript
function onePunch(cadena: string): string {
  return ((cadena.length === 0)?
  'Broken!':cadena.replace( /[ae]/ig, '').split(' ').sort().join(' '));
}

console.log(onePunch('Beard Jeans Hairbrush Knuckleduster Sand'));
console.log(onePunch('Snot Snow Soda Tank Beard'));
console.log(onePunch(''));
```

**OUTPUT**
```
Brd Hirbrush Jns Knuckldustr Snd
Brd Snot Snow Sod Tnk
Broken!
```

Con un operador ternario comprobamos si la longitud de la cadena de entrada es 0. Si efectivamente es 0 retornamos la cadena **Broken!**. En caso de que no lo sea lo que hacemos es itilizar la función **replace** para eliminar las a y e encontradas por la expresión /[ae]/ig. Es importante usar el flag i para que no tenga en cuenta si son mayúsculas o minúsculas. Esa cadena resultante la separamos por espacios gracias a **split(' ')** y ordenamos alfabeticamente gracias a **sort()**. Finalmente volvemos a reunir la cadena dejando un espacio entre palabras con **join(' ')**. 

### Ejercicio 6

[Acceso al código fuente](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct03-static-types-functions-EduardoSY/blob/master/src/ejercicio-6.ts)

Ahora debemos validar cadenas según el formato ISBN-10. Las cadenas válidas pueden tener o no guiones, están formadas por 9 dígitos y un último caracter de verificación que puede ser otro dígito o una X, que corresponde a un 10.
Para que sea válido debe cumplirse:
**(x1 * 10 + x2 * 9 + x3 * 8 + x4 * 7 + x5 * 6 + x6 * 5 + x7 * 4 + x8 * 3 + x9 * 2 + x10 * 1) mod 11 == 0**

```typescript
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
```

**OUTPUT**
```
Acepta
Acepta
Acepta
No acepta
No acepta
```

Lo primero que hacemos es eliminar los guiones y separar cada caracter del código. Asi trabajaremos más comodamente.
Una vez comprobamos que la longitud es la correcta vamos a verificar la cadena según la formula de arriba. Recorremos el vector con todos caracteres realizando la operación de multiplicación. Pasamos el dígito a valor numérico y multiplicamos por una variable auxiliar que inicialmente está a 10. Vamos acumulando la suma de estas multiplicaciones y decreciendo en una unidad el valor de la variable auxiliar. En caso de que el caracter sea una X lo sustituimos por 10. 
Finalizada toda la suma calculamos el modulo 11 de dicho valor. Si el resultado es 0 indica que es un código correcto y, por tanto, devolvemos true.

### Ejercicio 7

[Acceso al código fuente](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct03-static-types-functions-EduardoSY/blob/master/src/ejercicio-7.ts)

Junto con el 2 es de los ejercicios más complejos. Para realizarlo vamos a seguir el algoritmo que nos proporciona [GeeksforGeeks](https://www.geeksforgeeks.org/find-next-greater-number-set-digits/).

```typescript
function nextGreater(numero: number): number {
  let numstr: string = numero.toString();
  let num: string[] = numstr.split('');
  let i: number = 0;

  for (i = num.length - 1; i > 0; i--) {
    if (+num[i] > +num[i-1]) {
      break;
    }
  }
  if (i === 0) {
    // Significa que esta ordenado decreciente y no hay mayor posible.
    return -1;
  }
  let pivot: string = num[i-1];
  let menor: number = i;
  // Buscamos el menor del lado derecho del pivote.
  for (let j: number = num.length - 1; j > i; j--) {
    if ((+num[j] > +pivot) && (+num[j] < +num[menor])) {
      menor = j;
    }
  }
  // Swap
  [num[i-1], num[menor]] = [num[menor], num[i-1]];
  numstr = num.join('');
  // Ordenamos el lado derecho de la pos del pivote
  let substring: string = numstr.substr(i);
  let aux: string[] = substring.split('').sort();
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
```

**OUTPUT**
```
531
2071
6010
-1
-1
-1
```

Lo primero que hacemos es pasar el número a string para poder dividirlo dígito a dígito y trabajar con cada uno de manera individual.

Buscamos el primer número, de derecha a izquierda, cuyo siguiente número sea menor . Este será nuestro pivote. 
En caso de que no lo encontremos significará que el número tiene sus dígitos ordenados de mayor a menor y por tanto no es posible que exista un número mayor con esos dígitos.
Vemos que estoy usando +num[i]. Añadir un **+** junto a un string nos permite convertirlo a número.

Luego buscamos a la derecha del pivote el menor número mayor que el pivote. Una vez lo encontramos lo intercambiamos con el pivote.

Ahora vamos a trabajar con los números que están a la derecha de la posición donde estaba el pivote. Reunimos el string y con la función **substr()** sacamos la parte derecha.
Ordenamos esta parte derecha con **sort()** y, una vez tengamos esto unimos las dos partes del número para formar nuestro número final.

### Ejercicio 8

[Acceso al código fuente](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct03-static-types-functions-EduardoSY/blob/master/src/ejercicio-8.ts)

En este caso tenemos que calcular cúantas IPs hay en entre dos ips dadas. Estas ips serán strings y el resultado será un número.

```typescript
function ip2int(ip: string): number {
  let ipSeparado: string[] = ip.split('.');
  let resultado: number = 0;
  for (let i: number = 3; i >= 0; i--) {
    resultado += parseInt(ipSeparado[i]) * Math.pow(256, 3-i);
  }
  return resultado;
}


function ipsInRange(ipinicio: string, ipfinal: string): number {
  let ip1: number = ip2int(ipinicio);
  let ip2: number = ip2int(ipfinal);
  if (ip1 > ip2) {
    [ip1, ip2] = [ip2, ip1];
  }
  return (ip2 - ip1);
}

console.log(ipsInRange('10.0.0.0', '10.0.0.50'));
console.log(ipsInRange('20.0.0.0', '20.0.1.0'));
console.log(ipsInRange('20.0.10.0', '20.0.1.0'));
console.log(ipsInRange('20.0.0.10', '20.0.1.0'));
```

**OUTPUT**
```
50
256
2304
246
```

Para resolver este ejercicio hemos hecho dos funciones. La primera funcion, **ip2int**, pasa la dirección dada a un número.
Separamos los valores usando como separador los puntos. 

Cada uno de los 4 octetos de las IPS corresponde a 256 direcciones. Por tanto, cada octeto debemos multiplicarlo por 256 elevado a su posición, siendo la derecha el 0, y el de la izquierda un 3. Con esto tenemos la cantidad de direcciones de la IP.

Pasando a la función **ipsInRange**, lo primero es saber qué dirección es mayor que la otra para evitar que la resta nos de un número negativo. Una vez sepamos qué dirección es mayor podemos restar y obtenemos las IP en dicho rango.

### Ejercicio 9

[Acceso al código fuente](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct03-static-types-functions-EduardoSY/blob/master/src/ejercicio-9.ts)

En este caso vamos a calcular el daño que hace nuestro pokemon en un combate.

```typescript
function combatePokemon(tipo1: string, tipo2: string,
    ataque: number, defensa: number): number {
  // Variable de efectividad del ataque
  let efectividad: number = 0;
  if (tipo1 === tipo2) {
    efectividad = 0.5;
  } else if (tipo1 === 'Fuego') {
    switch (tipo2) {
      case 'Hierba':
        efectividad = 2;
        break;
      case 'Electrico':
        efectividad = 1;
        break;
      case 'Agua':
        efectividad = 0.5;
        break;
    }
  } else if (tipo1 === 'Agua') {
    switch (tipo2) {
      case ('Hierba' || 'Electrico'):
        efectividad = 0.5;
        break;
      case 'Fuego':
        efectividad = 2;
        break;
    }
  } else if (tipo1 === 'Electrico') {
    switch (tipo2) {
      case ('Fuego' || 'Hierba)'):
        efectividad = 1;
        break;
      case 'Agua':
        efectividad = 2;
        break;
    }
  } else {
    switch (tipo2) {
      case 'Electrico':
        efectividad = 1;
        break;
      case 'Agua':
        efectividad = 2;
        break;
      case 'Fuego':
        efectividad = 0.5;
        break;
    }
  }

  let damage: number = 50 * (ataque/defensa) * efectividad;
  return parseFloat(damage.toFixed(2));
}

console.log('Pikachu [at. 54] VS Magikarp [def. 46] --> Damage: ' +
combatePokemon('Electrico', 'Agua', 54, 46));

console.log('Torchic [at. 9] VS Treecko [def. 15] --> Damage: ' +
combatePokemon('Fuego', 'Hierba', 9, 15));
```

**OUTPUT**
```
Pikachu [at. 54] VS Magikarp [def. 46] --> Damage: 117.39
Torchic [at. 9] VS Treecko [def. 15] --> Damage: 60
```

A esta función le pasamos como parámetro el tipo del pokemon atacante y el tipo del pokemon defensor como strings y el ataque del atacante y la defensa del defensor como números. El resultado a devolver será el daño que causa nuestro pokemon.

Como el valor de la efectividad depende de los tipos lo que haremos será ir comparando cada uno de los tipos para así asignar el valor correspondiente a la efectividad.

El primer caso es que ambos pokemon sea del mismo tipo. En caso de que sea cierto la efectividad será neutra, es decir, 1.
En caso contrario vamos seleccionando con un if el tipo del primer pokemon. Dentro de cada if tenemos un switch que será el que asignará la efectividad en base al tipo del pokemon defensor.

Una vez sepamos la efectividad que tendrá el ataque simplemente hacemos la operación **number = 50 * (ataque/defensa) * efectividad**. Puede ser que el resultado de esta operación nos de decimales asi que a la hora de retornar el valor vamos a hacer que se muestren unicamente 2 decimales como máximo gracias a **toFixed()**. Esa función devuelve un string asi que debemos pasarla a número con **parseFloat**.

### Ejercicio 10

[Acceso al código fuente](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct03-static-types-functions-EduardoSY/blob/master/src/ejercicio-10.ts)

En este último ejercicio vamos a comprobar que los nombres de usuario sean válido según las siguientes características:
1. El nombre de usuario tiene que tener al menos 4 caracteres y no más de 30.
2. El nombre de usuario no puede empezar ni terminar con un guión bajo.
3. El nombre de usuario tiene que contener al menos una letra mayúscula, una letra minúscula, un número y algún símbolo especial ($,-,\_).
4. No se permite la repetición de un mismo tipo de caracter más de dos veces seguidas.

```typescript
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
```

**OUTPUT**
```
false
true
false
```

Para esta función **isValidUsername** debemos saber qué hace regex.**test**(string). Test aplica la expresión regular al string que le pasamos como parámetro y devuelve true en caso de que se cumpla o false en caso de que no se cumpla. Sabiendo eso vamos a analizar cada if de nuestra función.

El **primer IF** corresponde a la primera cláusula. Nos comprueba que el tamaño del nombre esté entre 4 y 30 caractéres.

El **segundo IF** corresponde a la segunda cláusula. Comprobamos que la cadena no empieza ni acaba por guión bajo.

El **tercer IF** corresponde a la tercera cláusula. Aquí comprobamos que tenemos **al menos** un caracter de cada tipo: minúscula, mayúscula, número y caracter especial.
Los símbolos que estamos comprobando son estrictamente los especificados en el enunciado.

El **último IF** corresponde a la cuarta cláusula. En este caso vamos a buscar que existan 3 repeticiones de un mismo tipo de caracter. A ese resultado vamos a aplicarle el operador **!** para negar el resultado y así permitir aquellas cadenas que **NO** tengan más de dos repeticiones.

Si hemos logrado pasar todos esos condicionales significa que la cadena es válida. Por tanto retornamos true.
Si por el contrario fallamos algún condicional retornamos false.

## 4. Dificultades encontradas
De manera general los ejercicios han sido de baja complejidad. Sin embargo, es cierto que algunos de ellos han resultado un poco más liosos y complejos. Por ejemplo, en el caso del ejercicio 2, el problema surgía por entender cómo funcionaba la forma de representación con factoriales. Gracias a algunos compañeros y a la página de wikipedia en inglés (ya que esta tiene una explicación más amplia que su version española) pude entenderlo.

Otro ejercicio relativamente complejo es el 7. El problema aquí surgía en cómo llegar al algoritmo. Cierto es que una vez lo analizas no es tán complejo pero aún así tuve que buscar dicho algoritmo en la web. En la página de GeeksforGeeks estaba muy bien explicado y eso me permitió entenderlo y programarlo facilmente.

Finalmente está el ejercicio 10. El problema lo tuve intentando encontrar una expresión regular que, en una sola línea, me permitiera comprobar todo lo que se pedía. Estuve a medio camino de logarlo pero se me hizo muy complicado asi que finalmente opté por verificar las cadenas en diversas etapas. 

También cabe mencionar que, a la hora de almacenar los ficheros para este informe, me hubiese gustado tener una rama vacia a parte para ello. Sin embargo, me olvidé de crearla al inicio y a la hora de intentar crear una rama vacia una vez finalicé mis ejercicios tuve muchos problemas asi que decidí no tocar más ese aspecto para evitar más inconvenientes.

## 5. Conclusión
Esta práctica me ha parecido sumamente interesante y divertida. He aprendido mucho sobre Typescript mientras hemos ido resolviendo ejercicios. Ha sido bastante entretenido ir dando solución a las propuestas con este nuevo lenguaje ya que me ha permitido ver lo versátil que puede ser Typescript / Javascript. 
Aunque el resultado sea positivo, también es cierto que algunos ejercicios se me han complicado un poco.

## 6. Recursos utilizados:
- [Guión práctica 3](https://ull-esit-inf-dsi-2021.github.io/prct03-types-functions/): Guión de la práctica .
- [Guía para crear un proyecto](https://ull-esit-inf-dsi-2021.github.io/typescript-theory/typescript-project-setup.html): Guía del profesor para crear un proyecto.
- [Algoritmo ejercicio 7](https://www.geeksforgeeks.org/find-next-greater-number-set-digits/): Algoritmo empleado para encontrar el siguiente número mayor.
- [Sistema factorial](https://en.wikipedia.org/wiki/Factorial_number_system): Página inglesa de Wikipedia sobre el sistema numérico factorial.
- [Regex101](https://regex101.com/): Web para construir y testear expresiones regulares.
- [Métodos de String](https://www.w3schools.com/js/js_string_methods.asp): Página con una gran lista de métodos aplicables a los string.
