import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  try{
    const patient = patientService.getPatientById(id);
    if(!patient) throw new Error('No patient found');
    
    res.json(patient);
  } catch(e) {
    res.status(400).send(e.message);
  }
});

router.post('/', (req, res) => {
  try{  
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;

  try{
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(id, newEntry);

    res.json(addedEntry);
  } catch(e) {
    res.status(400).send(e.message);
  }
});

export default router;