/**
 * create a given number of stars equivalent to the closest whole number of the parameter
 * @param {number} rating - the rating
 * @returns {string} a number of stars
 */

export const createStars = (rating: number): string => {
  const roundedNum = Math.round(rating);
  let stars = '';
  for (let i = 0; i < roundedNum; i++) {
    stars += '⭐';
  }
  return stars;
};
