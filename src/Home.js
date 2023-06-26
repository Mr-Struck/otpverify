import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const Home = ({ isChecked, checkList, handleCheck }) => {
  const navigate = useNavigate();
  return (
    <div className="checkList">
      <div className="title">Select your preferred cities:</div>
      <div className="list-container">
        {checkList.map((item, index) => (
          <div key={index}>
            <input value={item} type="checkbox" onChange={handleCheck} />
            <span className={isChecked(item)}>{item}</span>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/selected")}>Submit</button>
    </div>
  );
};

Home.propTypes = {
  checkList: PropTypes.array,
  isChecked: PropTypes.func,
  handleCheck: PropTypes.func,
};
