import React, { useState } from "react";
import "./UserCreationForm.css";
const UserCreationForm: React.FC = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    password: "",
    rePassword: "",
    agreed: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formValues.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="input"
        />
      </div>

      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formValues.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="input"
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Your Password"
          className="input"
        />
      </div>

      <div>
        <label>Re-Password</label>
        <input
          type="password"
          name="rePassword"
          value={formValues.rePassword}
          onChange={handleChange}
          placeholder="Your Password Again"
          className="input"
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="agreed"
            checked={formValues.agreed}
            onChange={handleChange}
          />
          I agree to the Terms and Conditions
        </label>
      </div>

      <button type="submit" className="submit-btn">
        Submit
      </button>
      <a href="/login">Se connecter</a>
    </form>
  );
};

export default UserCreationForm;
