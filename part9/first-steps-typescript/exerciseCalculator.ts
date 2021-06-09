interface Result{ 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number 
}

export const calculateExercises = (trainingPeriod: Array<number>, target: number) : Result => {
  let sum = 0;
  let rating = 0;
  let description = "";
  for(let i = 0; i < trainingPeriod.length; i++){
    sum = sum + trainingPeriod[i];
  }
  const average = sum / trainingPeriod.length;
  const trainingDays = trainingPeriod.filter(h => h > 0);
  const success = trainingPeriod.filter(h => h > 2);

  if (average < (target / 2) ) {
    rating = 1;
    description = 'Not good, increase exercise hours to reach target';
  } else if ( average > (target / 2) && average < target){
    rating = 2;
    description = 'Not too bad but could be better';
  } else if( average >= target) {
    rating = 3;
    description = 'Good!';
  }

  return { 
    periodLength: trainingPeriod.length,
    trainingDays: trainingDays.length,
    success: success.length === 7,
    rating: rating,
    ratingDescription: description,
    target: target,
    average: average 
  };
};

try {
  const trainingValues = process.argv.slice(3);

  const target = Number(process.argv[2]); 
  const trainingPeriod: Array<number> = trainingValues.map(n => Number(n));
  console.log(calculateExercises(trainingPeriod, target));
} catch (e) {
  console.log('Something went wrong, error message: ', e);
}