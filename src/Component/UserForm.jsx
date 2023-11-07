import React, { useState } from "react";
import "../App.css";

const UserForm = ({ setPlayers}) => {
    const [formData, setFormData] = useState({
      firstName: "",
      secondName: "",
    });
    const submitHandle = (e) => {
      e.preventDefault();
      setPlayers([formData]);
    };
    const inputHandle = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
      <>
        <div>
          <form className="form-container" onSubmit={(e) => submitHandle(e)}>
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">
                First Player:
              </label>
              <input
                className="form-input"
                type="text"
                id="firstName"
                name="firstName"
                onChange={inputHandle}
                value={formData.firstName}
              />
            </div>
            <div className="form-group">
              {" "}
              <label className="form-label" htmlFor="secondName">
                Second Player:
              </label>
              <input
                className="form-input"
                type="text"
                id="secondName"
                name="secondName"
                onChange={inputHandle}
                value={formData.secondName}
              />
            </div>
            <button className="form-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </>
    );
  };

export default UserForm