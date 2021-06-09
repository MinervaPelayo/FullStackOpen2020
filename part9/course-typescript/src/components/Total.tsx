import React from 'react';
import { CoursePart } from '../types'

interface Content {
  courseParts: CoursePart[]
}

const Total= ({ courseParts }: Content) => {
  return(
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;