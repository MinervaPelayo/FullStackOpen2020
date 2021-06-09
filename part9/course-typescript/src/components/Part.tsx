import React from 'react';
import { CoursePart } from '../types';
import { assertNever } from '../utils';

interface Content {
  courseParts: CoursePart[];
}

const Part= ({ courseParts }: Content) => {
  return <>{
    courseParts.map(part => {
      switch (part.type) {
        case "normal":  
          return(
            <div key={part.name} style={{paddingBottom: 20}}>
              <h4 style={{margin: 0}}>{part.name} {part.exerciseCount}</h4>
              <p style={{fontStyle: "italic", margin: 0}}>{part.description}</p>
            </div>
          );
        case "groupProject":
          return(
            <div key={part.name} style={{paddingBottom: 20}}>
              <h4 style={{margin: 0}}>{part.name} {part.exerciseCount}</h4>
              <p style={{margin: 0}}>Project exercises {part.groupProjectCount}</p>
            </div>
          );
        case "submission":
          return (
            <div key={part.name} style={{paddingBottom: 20}}>
              <h4 style={{margin: 0}}>{part.name} {part.exerciseCount}</h4>
              <p style={{fontStyle: "italic", margin: 0}}>{part.description}</p>
              <p style={{margin: 0}}>submit to {part.exerciseSubmissionLink}</p>
            </div>
          );
        case "special":
          return(
            <div key={part.name} style={{paddingBottom: 20}}>
              <h4 style={{margin: 0}}>{part.name} {part.exerciseCount}</h4>
              <p style={{fontStyle: "italic", margin: 0}}>{part.description}</p>
              <p style={{margin: 0}}>required skills: {part.requirements.toString()}</p>
            </div>
          );
        default:
          return assertNever(part);
      }
    })
  }</>;
};

export default Part;