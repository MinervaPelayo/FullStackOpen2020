import React, { useState, useEffect } from "react";
import axios from 'axios'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault();
    const names = persons.map((person) => person.name);
    if (names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const contactObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(contactObject));
      setNewName("");
      setNewNumber("");
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
      <Persons filterName={filterName} persons={persons} />
    </div>
  );
};

export default App;
