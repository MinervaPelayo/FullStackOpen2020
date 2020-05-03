import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import contactService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])

  const eraseContact = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {     
    contactService
      .deleteContact(person.id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
  }}

  const addContact = (event) => {
    event.preventDefault();
    const names = persons.map((person) => person.name);
    if (names.includes(newName)) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if(result){
        const oldContact =persons.filter((person) => person.name === newName);
        const contactObject = {
          name: newName,
          number: newNumber,
        };

        contactService
        .update(oldContact[0].id, contactObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== oldContact[0].id ? person : response));
          setNewName("");
          setNewNumber("");
        })
      }
    } else {
      const contactObject = {
        name: newName,
        number: newNumber,
      };

      contactService
        .create(contactObject)
        .then(returnedContact=> {
          setPersons(persons.concat(returnedContact));
          setNewName("");
          setNewNumber("");
        })
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilter={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addContact={addContact}
        newName={newName}
        handleName={handleNameChange}
        newNumber={newNumber}
        handleNumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filterName={filterName} persons={persons} eraseContact={eraseContact} />
    </div>
  );
};

export default App;
