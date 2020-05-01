import React from "react";
import CountryDetails from "./CountryDetails";

const Countries = ({ filterName, setFilterName, countries }) => {
  const filterCountries = countries.filter((country) =>
      country.name.toLowerCase().indexOf(filterName.toLowerCase()) > -1
  );

  if (filterCountries.length > 10) {
    return (
        <p>Too many matches, specify another filter</p>
    )
  } else if (filterCountries.length > 1 && filterCountries.length <= 10) {
    return (
        filterCountries.map((country) => (
            <div key={country.alpha3Code}>
                {country.name} <button onClick={() => setFilterName(country.name)}>show</button>
            </div>
        ))
    )
  } else {
    return (
        filterCountries.map((country) => (
            <CountryDetails key={country.alpha3Code} country={country}/>
        ))
    )
  }
};

export default Countries;
