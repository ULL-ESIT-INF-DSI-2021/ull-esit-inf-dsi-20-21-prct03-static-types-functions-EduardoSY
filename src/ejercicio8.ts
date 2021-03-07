// Ejercicio 8: Calculadora de direcciones IP en un rango

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
