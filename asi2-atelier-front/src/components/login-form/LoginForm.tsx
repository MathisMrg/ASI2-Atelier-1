import React, { useState } from 'react';
import './LoginForm.css';
import { FaUserCircle } from "react-icons/fa";
const LoginForm: React.FC = () => {
    const [formValues, setFormValues] = useState({
        firstName: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormValues({
            ...formValues,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted', formValues);
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div className="login-icon">
                <FaUserCircle size={80}/>
            </div>

            <div className="infos-login">
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="login-input"
                />
            </div>

            <div className="infos-login">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="Your Password"
                    className="login-input"
                />
            </div>


            <button type="submit" className="login-submit-btn">Submit</button>
        </form>
    );
};

export default LoginForm;
