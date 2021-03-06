function isLeapYear(year) {
    if ((year % 4) === 0) {
        if (((year % 100) != 0) || ((year % 400) === 0)) {
            return ("Es bisiesto");
        }
    }
    return ("No es bisiesto");
}
let fecha = 1961;
let fecha2 = 1992;
console.log(isLeapYear(fecha));
console.log(isLeapYear(fecha2));
