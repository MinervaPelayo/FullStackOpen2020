import React from "react";

const Contacts = (props) => {
  return props.persons.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}
      <button onClick={()=> props.handleDelete(person)}>delete</button>
    </div>
  ));
};

const ContactsFilter = (props) => {
  return props.persons
    .filter(
      (person) =>
        person.name.toLowerCase().indexOf(props.filterName.toLowerCase()) > -1
    )
    .map((person) => (
      <div key={person.name}>
        {person.name} {person.number}
        <button onClick={props.handleDelete}>delete</button>
      </div>
    ));
};

const Persons = (props) => {
  return (
    <div>
      {props.filterName === "" ? (
        <Contacts persons={props.persons} handleDelete={props.eraseContact}/>
      ) : (
        <ContactsFilter persons={props.persons} filterName={props.filterName} handleDelete={props.eraseContact} />
      )}
    </div>
  );
};

export default Persons;
