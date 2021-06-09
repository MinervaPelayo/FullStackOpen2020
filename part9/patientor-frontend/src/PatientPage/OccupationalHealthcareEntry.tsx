import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import Diagnoses from "../PatientPage/Diagnoses";
import { Card, Icon } from "semantic-ui-react";

interface OccupationalProp {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcare = ({ entry }: OccupationalProp) => {
  return(
    <div style={{paddingBottom: 10, paddingTop: 10}}>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {entry.date}
            <Icon name='stethoscope' size="large" />
            {entry.employerName}
          </Card.Header>
          <Card.Meta>{entry.description}</Card.Meta>
          <Card.Description>
            {entry.diagnosisCodes && <Diagnoses entry={entry} />}
          </Card.Description>
        </Card.Content>
      </Card>
  </div>
  );
};

export default OccupationalHealthcare;