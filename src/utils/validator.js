module.exports.validatePlanet = function validatePlanet(planet) {
  if (typeof planet.haveWater !== "boolean") return true;

  if (!planet.picture) return true;

  if (!planet.name) return true;

  if (
    (!planet.satellite && typeof planet.satellite !== "number") ||
    planet.satellite < 0
  )
    return true;

  if (
    (!planet.orbitalPeriod && typeof planet.orbitalPeriod !== "number") ||
    planet.orbitalPeriod < 0
  )
    return true;

  return false;
};
