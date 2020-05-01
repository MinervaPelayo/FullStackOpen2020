import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    axios
    .get("https://restcountries.eu/rest/v2/all")
    .then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <div>
      find countries
      <input value={filterName} onChange={handleFilterChange} />
      {filterName === "" ? (
        <p>Search for countries</p>
      ) : (
        <Countries
          filterName={filterName}
          setFilterName={setFilterName}
          countries={countries}
        />
      )}
    </div>
  );
};

export default App;
