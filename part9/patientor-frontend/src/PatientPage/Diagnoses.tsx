import React from "react";
import { Entry } from "../types";
import { useStateValue } from "../state";
import { Header, List } from "semantic-ui-react";

interface EntryProp {
  entry: Entry;
}

const Diagnoses = ({ entry }: EntryProp) => {
  const [{ diagnoses },] = useStateValue();

  return(
    <div key={entry.id} style={{ paddingTop: 20 }}>
      <Header as="h5">Diagnoses</Header>
      <List bulleted>
        {entry.diagnosisCodes?.map(c=> {
          const codeDescription = diagnoses.find(d => d.code === c);
          return(
            <List.Item key={c}>{c} {codeDescription?.name}</List.Item>
          );
        })}
      </List>
    </div>
  );
};

export default Diagnoses;