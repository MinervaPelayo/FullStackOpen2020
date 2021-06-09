import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectEntryTypeField, DiagnosisSelection, NumberField, EntryTypeOption } from "../AddPatientModal/FormField";
import { Entry, EntryTypeName } from "../types";
import { useStateValue } from "../state";
import { isDate, isRating } from "../utils";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryTypeName.HealthCheck, label: "Health Check" },
  { value: EntryTypeName.OccupationalHealthcare, label: "Occupational Healthcare" },
  { value: EntryTypeName.Hospital, label: "Hospital" }
];

export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryTypeName.HealthCheck,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: -1,
        employerName: "",
        sickLeave: { startDate: "", endDate: "" },
        discharge: { date: "", criteria: "" },

      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        let errors: { [field: string]: string } 
          | {
              [field: string]: {
                [field: string]: string;
            };
          }  = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if(!isDate(values.date)) {
          errors.date = "Incorrect date format";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === EntryTypeName.HealthCheck && !isRating(values.healthCheckRating)) {
          errors.healthCheckRating = "Invalid value for health check rating";
        }
        if (!values.employerName && values.sickLeave.startDate && values.sickLeave.endDate) {
          errors.employerName = requiredError;
        }
        if ((values.sickLeave.startDate || values.sickLeave.endDate) && (!isDate(values.sickLeave.startDate) || !isDate(values.sickLeave.endDate))){
          errors = {
            ...errors,
            sickLeave: {
              startDate: "Invalid start date or end date format",
              endDate: "Invalid start date or end date format"
            }
          };
        }
        if ((values.discharge.date || values.discharge.criteria) && (!isDate(values.discharge.date) || !values.discharge.criteria)){
          errors = {
            ...errors,
            discharge: {
              date: "Discharge date format incorrect or missing criteria",
              criteria: "Discharge date format incorrect or missing criteria"
            },
          };
        }
        if(values.type === EntryTypeName.HealthCheck && values.employerName) {
          errors.employerName = "Remove this field for Healthcheck Entry";
        }
        if(values.type === EntryTypeName.HealthCheck && (values.discharge.date || values.discharge.criteria)){
          errors = {
            ...errors,
            discharge: {
              date: "Remove this field for Healthcheck Entry",
              criteria: "Remove this field for Healthcheck Entry"
            },
          };
        }
        if(values.type === EntryTypeName.HealthCheck && (values.sickLeave.startDate || values.sickLeave.endDate)){
          errors = {
            ...errors,
            sickLeave: {
              startDate: "Remove this field for Healthcheck Entry",
              endDate: "Remove this field for Healthcheck Entry"
            },
          };
        }
        if(values.type === EntryTypeName.OccupationalHealthcare && (values.discharge.date || values.discharge.criteria || values.healthCheckRating != -1 || !values.employerName)){
          errors.healthCheckRating = "Select option -1 for Occupational Healthcare entry";
          errors.employerName = requiredError;
          errors = {
            ...errors,
            sickLeave: {
              startDate: "Remove this field for Occupational Healthcare Entry",
              endDate: "Remove this field for Occupational Healthcare Entry"
            },
          };
        }
        if(values.type === EntryTypeName.Hospital && (values.sickLeave.startDate || values.sickLeave.endDate || values.employerName || values.healthCheckRating != -1)){
          errors.employerName = "Remove this field for Hospital Entry";
          errors.healthCheckRating = "Select option -1 for Hospital entry";
          errors = {
            ...errors,
            sickLeave: {
              startDate: "Remove this field for Hospital Entry",
              endDate: "Remove this field for Hospital Entry"
            },
          };
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectEntryTypeField
              label="Entry type"
              name="type"
              options={entryTypeOptions}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            < DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Health Check Rating"
              name="healthCheckRating"
              component={NumberField}
              min={-1}
              max={3}
            />
            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
                  label="Sick Leave Start Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
            />
            <Field
                  label="Sick Leave End Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
            />
            <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
            />
            <Field
                  label="Discharge Criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;