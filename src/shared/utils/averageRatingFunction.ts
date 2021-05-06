export default function averageRating(ratingValues: Array<number>): string {
  let sumRatingValues = 0;
  for (let i = 0; i < ratingValues.length; i = 1 + i) {
    sumRatingValues += ratingValues[i];
  }

  const averageRatingValues = (sumRatingValues / 5).toFixed(1);

  return averageRatingValues;
}
