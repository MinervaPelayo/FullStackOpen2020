import React from "react";

const Contacts = (props) => {
  return props.persons.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}
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
      </div>
    ));
};

const Persons = (props) => {
  return (
    <div>
      {props.filterName === "" ? (
        <Contacts persons={props.persons} />
      ) : (
        <ContactsFilter persons={props.persons} filterName={props.filterName} />
      )}
    </div>
  );
};

export default Persons;
