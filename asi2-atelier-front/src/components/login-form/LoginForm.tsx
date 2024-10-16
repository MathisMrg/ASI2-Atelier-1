import React, { Dispatch, SetStateAction, useState } from 'react';
import './LoginForm.css';
import { FaUserCircle } from "react-icons/fa";
import { getUsers } from '../../service/UserService';  
import { Navigate } from 'react-router-dom';
import { User } from '../../model/userModel';

interface LoginFormProps {
    setUser: Dispatch<SetStateAction<User | null>>,
}

const LoginForm: React.FC<LoginFormProps> = ({setUser}) => {
    const [formValues, setFormValues] = useState({
        firstName: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormValues({
            ...formValues,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const users = await getUsers();
            if (!users) {
                setErrorMessage('Error fetching users.');
                setIsSubmitting(false);
                return;
            }

            const foundUser = users.find(user => 
                user.login === formValues.firstName && user.pwd === formValues.password
            );
            
            const userExists = foundUser !== undefined;

            if (userExists) {
                console.log('Login successful!');
                localStorage.setItem('user', JSON.stringify(foundUser));
                setUser(foundUser);
                return <Navigate to="/" />;
            } else {
                setErrorMessage('Invalid first name or password.');
            }

        } catch (error) {
            console.error("Error during login process:", error);
            setErrorMessage('An error occurred during login.');
        } finally {
            setIsSubmitting(false);
        }
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
                    required
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
                    required
                />
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit" className="login-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    );
};

export default LoginForm;
