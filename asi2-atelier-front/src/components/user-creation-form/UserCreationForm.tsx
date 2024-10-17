import React, { useState } from "react";
import "./UserCreationForm.css";
import { Link } from "react-router-dom";
import { createUser } from "../../service/UserService" ;

const UserCreationForm: React.FC = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    password: "",
    rePassword: "",
    agreed: false,
  });
  
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formValues.password !== formValues.rePassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!formValues.agreed) {
      setMessage("You must agree to the terms and conditions.");
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    const userToCreate = {
      login: formValues.firstName,
      pwd: formValues.password,
      lastName: formValues.lastName,
      surName: formValues.firstName,
      email: "",
      account: 10000,
      cardList: [],
    };

    const createdUser = await createUser(userToCreate);

    setIsSubmitting(false);

    if (createdUser) {
      setMessage("User created successfully!");
      setFormValues({
        firstName: "",
        lastName: "",
        password: "",
        rePassword: "",
        agreed: false,
      });
    } else {
      setMessage("Failed to create user. Please try again.");
    }
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
          required
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
          required
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
          required
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
          required
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="agreed"
            checked={formValues.agreed}
            onChange={handleChange}
            required
          />
          I agree to the Terms and Conditions
        </label>
      </div>

      <div className="submit-and-login">
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <div>or</div>
        <Link to="/login" className="home-link">
          login
        </Link>
      </div>

      {message && <div className="message">{message}</div>} {/* Affichage du message */}
    </form>
  );
};

export default UserCreationForm;
