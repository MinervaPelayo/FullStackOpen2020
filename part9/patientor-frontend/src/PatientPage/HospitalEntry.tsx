import React from "react";
import { HospitalEntry } from "../types";
import { Card, Icon } from "semantic-ui-react";
import Diagnoses from "../PatientPage/Diagnoses";

interface HospitalProp {
  entry: HospitalEntry;
}

const Hospital = ({ entry }: HospitalProp) => {
  return(
    <div style={{paddingBottom: 10,paddingTop: 10}}>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {entry.date}
            <Icon name='hospital' size="large" />
          </Card.Header>
          <Card.Meta>{entry.description}</Card.Meta>
          <Card.Description>
            {entry.discharge && <span>Discharge criteria: </span>}
            {entry.discharge?.criteria}
            {entry.diagnosisCodes && <Diagnoses entry={entry} />}
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Hospital;