import React, { useEffect } from "react";
import axios from "axios";
import { Container, Icon, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { Entry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetails, addEntry } from "../state";
import PatientEntries from "../PatientPage/PatientEntries";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  useEffect(() => {
    const fetchPatientById = async () => {
      try {
        const { data: patientDetails } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

        dispatch(setPatientDetails(patientDetails));
      } catch (e) {
        console.error(e.response?.data || 'Unknown Error');
      }
    };

    if(!patient || patient.id !== id) {
      void fetchPatientById();
    }

  }, [dispatch, id]);

  if(!patient || patient.id !== id){
    return null;
  }

  const openModal = (): void => setModalOpen(true);
  
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      const updatedPatient: Patient = {
        ...patient,
        entries: [
          ...patient.entries,
          newEntry
        ]
      };
      dispatch(addEntry(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  return (
    <div className="App">
      <Container>
        <h2>{patient.name}
            {patient.gender === "female" ?
              <Icon name="venus" size="large" /> :
              <Icon name="mars" size="large" />
            }
        </h2>
      </Container>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      {patient.entries.length > 0 && <h3>Entries</h3>}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
      <PatientEntries entries={patient.entries}/>
    </div>
  );
};

export default PatientPage;