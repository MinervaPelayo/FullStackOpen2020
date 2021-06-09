export const calculateBmi = (height: number, weight: number) : string => {
  const m = height / 100;
  const bmi = weight / (m * m);

  if (bmi < 18.5){
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal (healthy weight)';
  } else {
    return 'Overweight';
  }
};

try {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Something went wrong, error message: ', e);
}