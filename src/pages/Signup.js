import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
    const { signup } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const history = useHistory();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let valid = true;
        setNameError('');
        setEmailError('');
        setPasswordError('');
        setError('');

        if (!formData.name) {
            setNameError('Name is required.');
            valid = false;
        }

        if (!formData.email) {
            setEmailError('Email is required.');
            valid = false;
        } else if (!validateEmail(formData.email)) {
            setEmailError('Invalid email format.');
            valid = false;
        }

        if (!formData.password) {
            setPasswordError('Password is required.');
            valid = false;
        }

        if (!valid) return;

        try {
            await signup(formData);
            history.push('/login');
        } catch (err) {
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Signup
                </Typography>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!nameError}
                        helperText={nameError}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!emailError}
                        helperText={emailError}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Signup
                    </Button>
                </form>
                <p>Already have an account? <a href="/login">Log in</a></p>
            </Box>
        </Container>
    );
};

export default Signup;