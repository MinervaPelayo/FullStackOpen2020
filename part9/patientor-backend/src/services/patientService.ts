import {v1 as uuid} from 'uuid';
import patients from '../../data/patients';
import { Patient, NewPatient, NewEntry, Entry } from '../types';

const getPatients = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }) );  
};

const getPatientById = ( id: string ): Patient | undefined=> {
  const patient = patients.find(p => p.id === id ); 

  return patient;
};

const addPatient = ( patient: NewPatient ): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    entries: [],
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = ( patientId: string, entry: NewEntry ): Entry => {
  const entryId = uuid();
  const newEntry = {
    id: entryId,
    ...entry
  };

  const patient = patients.find(p => p.id === patientId);
  patient?.entries.push(newEntry);

  return newEntry;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
  addEntry
};