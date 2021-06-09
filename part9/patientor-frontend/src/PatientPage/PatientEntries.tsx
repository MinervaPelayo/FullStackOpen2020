import React from "react";
import { Entry } from "../types";
import { assertNever } from "../utils";
import HealthCheck from "../PatientPage/HealthCheckEntry";
import OccupationalHealthcare from "../PatientPage/OccupationalHealthcareEntry";
import Hospital from "../PatientPage/HospitalEntry";

interface Entries {
  entries: Entry[];
}

const PatientEntries = ({ entries}: Entries) => {
  return <>{
    entries.map(entry => {
      switch (entry.type) {
        case "Hospital":  
          return <Hospital key={entry.id} entry={entry} />;
        case "OccupationalHealthcare":
          return <OccupationalHealthcare key={entry.id} entry={entry} />;
        case "HealthCheck":
          return <HealthCheck key={entry.id} entry={entry} />;
        default:
          return assertNever(entry);
      }
    })
  }</>;
};

export default PatientEntries;