// Ejercicio 9: Combate pokemon

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