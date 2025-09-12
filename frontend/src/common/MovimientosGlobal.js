let movimientosGlobal = [];

export function getMovimientosGlobal() {
  return movimientosGlobal;
}

export function setMovimientosGlobal(movs) {
  movimientosGlobal = movs;
}

export function addMovimientoGlobal(mov) {
  movimientosGlobal.push(mov);
}

export function getMovimientosCount() {
  return movimientosGlobal.length;
}
