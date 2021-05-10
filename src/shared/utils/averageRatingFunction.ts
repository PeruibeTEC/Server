export default function averageRating(
  ratingValues: Array<number> | undefined,
): string {
  if (ratingValues === undefined) {
    return 'Value is undefined';
  }

  const ratingValuesToNumber = ratingValues.map(x => Number(x));

  let sumRatingValues = 0;
  for (let i = 0; i < ratingValuesToNumber.length; i = 1 + i) {
    sumRatingValues += ratingValuesToNumber[i];
  }

  const averageRatingValues = (
    sumRatingValues / ratingValuesToNumber.length
  ).toFixed(1);

  return averageRatingValues;
}
