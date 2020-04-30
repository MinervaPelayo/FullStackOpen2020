import React from "react";

const Filter = (props) => {
  return (
    <div>
      <p>filter shown with</p>
      <input value={props.filterName} onChange={props.handleFilter} />
    </div>
  );
};

export default Filter;
