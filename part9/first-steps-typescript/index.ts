import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  const isNumber: boolean = !isNaN(Number(height)) && !isNaN(Number(weight));

  if(!height || !weight || !isNumber){
    res.status(400).send({ error: "Malformatted parameters" });
  } else {
    const result = calculateBmi(Number(height), Number(weight));
    res.send({ weight, height, bmi: result});
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target }: any = req.body;
  let validNumbers = [];
  const validTarget = !isNaN(Number(target));

  if(Array.isArray(daily_exercises)){
    validNumbers = daily_exercises.filter(d => !isNaN(Number(d)));
  }

  if(!daily_exercises || !target){
    res.status(400).send({ error: "parameters missing" });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  } else if (validNumbers.length !== daily_exercises.length || !validTarget){
    res.status(400).send({ error: "malformatted parameters" });
  } else {
    const result = calculateExercises(daily_exercises, Number(target));
    res.json(result);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});