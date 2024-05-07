/**
 * converts 1000 kg to tonnes and rounds it to closest first decimal
 * @param {number} kg - number of kg
 * @returns {string} t CO₂e or kg CO₂e
 */

export const kgConverter = (kg: number): string => {
  if (kg >= 1000) {
    const tonnes = Math.round((kg / 1000) * 10) / 10;
    return `${tonnes} t CO₂e`;
  } else {
    return `${kg} kg CO₂e`;
  }
};
