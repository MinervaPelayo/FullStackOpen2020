import React from 'react';
import Part from '../components/Part'
import { CoursePart } from '../types';

interface Content {
  courseParts: CoursePart[];
}

const Content= ({ courseParts }: Content) => {
  return(
    <div>
      <Part courseParts={courseParts} />
    </div>
  );
};

export default Content;