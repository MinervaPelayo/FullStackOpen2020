import { Gender, NewPatient, NewEntry, BaseEntry, Diagnosis, HealthCheckRating, SickLeave, Discharge } from './types';

type patientFields = { 
  name: unknown, 
  dateOfBirth: unknown, 
  ssn: unknown, 
  gender: unknown, 
  occupation: unknown 
}; 

type entryFields = { 
  type: unknown,
  description: unknown, 
  date: unknown, 
  specialist: unknown, 
  diagnosisCodes: Array<Diagnosis['code']>, 
  healthCheckRating: unknown,
  employerName: unknown,
  sickLeave: SickLeave,
  discharge: Discharge
 }; 

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: patientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
  };

  return newPatient;
};

export const toNewEntry = ( fields : entryFields): NewEntry => {
  const isValidType = parseType(fields.type);
  if(!isValidType) throw new Error('Incorrect or missing type');

  const newBaseEntry: Omit<BaseEntry, 'id'> = {
    description: parseDescription(fields.description), 
    date: parseDate(fields.date), 
    specialist: parseSpecialist(fields.specialist), 
    diagnosisCodes: parseDiagnosisCodes(fields.diagnosisCodes)
  };

  switch(fields.type){
    case "HealthCheck":
      return{
        ...newBaseEntry,
        type: fields.type,
        healthCheckRating: parseHealthCheckRating(fields.healthCheckRating)
      };
    case "OccupationalHealthcare":
      return{
        ...newBaseEntry,
        type: fields.type,
        employerName: parseEmployerName(fields.employerName),
        sickLeave: parseSickLeave(fields.sickLeave)
      };
    case "Hospital":
      return{
        ...newBaseEntry,
        type: fields.type,
        discharge: parseDischarge(fields.discharge)
      };
    default:
      throw new Error('Incorrect type');
  }
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }

  return specialist;
};

const parseEmployerName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseDiagnosisCodes = (codes: Array<Diagnosis['code']>):  Array<Diagnosis['code']> => {  
  if (Array.isArray(codes)){
    const validCodes = codes.every(c => isString(c));
    if(!validCodes) throw new Error("Incorrect codes");
  }
  
  return codes;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isRating(rating)) {
    throw new Error('Incorrect or missing rating: ' + rating);
}
  return rating;  
};

const parseSickLeave = (sickLeave: SickLeave): SickLeave => {
  if(sickLeave.startDate || sickLeave.endDate){
    const validStartDate = isDate(sickLeave.startDate);
    const validEndDate = isDate(sickLeave.endDate);
    if(!validStartDate || !validEndDate) throw new Error('Incorrect sick leave');
  }

  return sickLeave;  
};

const parseDischarge = (discharge: Discharge): Discharge => {
  if(discharge.criteria || discharge.date){
    const validDate = isDate(discharge.date);
    const validCriteria = isString(discharge.criteria);
    if(!validDate || !validCriteria) throw new Error('Incorrect discharge');
  }

  return discharge;  
};

const parseType = (type: unknown): boolean => {
  let isValid = false;

  if(type === "HealthCheck" || type === "OccupationalHealthcare" || type === "Hospital"){
    isValid = true;
  }

  return isValid;
}; 

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};