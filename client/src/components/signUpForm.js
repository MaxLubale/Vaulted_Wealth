import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('User registered successfully!');
                // Redirect to login page after successful signup
                navigate('/login');
            } else {
                console.error('Failed to register user.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;
