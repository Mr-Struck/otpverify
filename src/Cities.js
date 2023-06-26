import React from "react";
import PropTypes from "prop-types";

export const Cities = ({ checkedItems }) => {
  return <div>{`Your selected cities: ${checkedItems}`}</div>;
};

Cities.propTypes = {
  checkedItems: PropTypes.string,
};
