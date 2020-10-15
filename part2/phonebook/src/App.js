import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification"
import contactService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState(null);
  const [className, setClassName] = useState(null);

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
          setClassName("success");
          setMessage(
            `Number of '${response.name}' was changed`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setClassName("error");
          setMessage(
            `Validation error or information of '${oldContact[0].name}' has already been removed`
          )
          setPersons(persons.filter(person => person.id !== oldContact[0].id))
          setTimeout(() => {
            setMessage(null)
          }, 5000)
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
          setClassName("success");
          setMessage(
            `Added '${returnedContact.name}'`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setClassName("error");
          setMessage(
            `Validation error. Name should be unique and min 3 characters long. Number min 8`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
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
      <Notification message={message} className={className} />
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
