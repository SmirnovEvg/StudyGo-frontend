import React from "react";
import axios from "axios";
import { PropTypes } from "prop-types";
import AddAdditionalForm from "./AddAdditionalForm";

import { useSelector, useDispatch } from "react-redux";
import { removeAdditional } from "../../actions";

function TeachertProfile(props) {
  const additionals = useSelector((state) => state.Additionals);
  const dispatch = useDispatch();

  const removeAdditionalById = async (id) => {
    dispatch(removeAdditional(id));
    await axios.delete("http://localhost:3333/api/timetable", {
      data: {
        id,
      },
    });
  };

  return (
    <div>
      Teacher
      <h3>{props.studnumber}</h3>
      <h3>{props.firstName}</h3>
      <h3>{props.secondName}</h3>
      <h3>{props.thirdName}</h3>
      <h3>{props.department}</h3>
      <h3>{props.rank}</h3>
      <h2>Допы</h2>
      <AddAdditionalForm subjects={props.subjects} />
      {additionals &&
        additionals.map((item, index) => {
          return (
            <div key={index}>
              <br />
              {item._id}
              <br />
              {item.subject.name}
              <br />
              {item.group.map((group, index) => {
                return <span key={index}>{group} </span>;
              })}
              <br />
              <button onClick={() => removeAdditionalById(item._id)}>
                remove
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default TeachertProfile;

TeachertProfile.propTypes = {
  studnumber: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  firstName: PropTypes.string.isRequired,
  secondName: PropTypes.string.isRequired,
  thirdName: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  rank: PropTypes.string.isRequired,
};
