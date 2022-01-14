import React, { useState } from 'react';
import { Button, Paper, Stack, TextField } from '@mui/material';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setConfirmPassword] = useState('');
    const handleSubmission = async () => {
        console.log('Signing up.');
    };
    const handleKeyPress = e => {
        if (e.key !== 'Enter') return;
        handleSubmission()
    };
    return (
        <>
            <Paper 
                variant='outlined'
                sx={{ width:400, padding:5 }}
            >
                <h2>Sign Up page</h2>
                <Stack>
                    <TextField
                        autoFocus
                        id='email'
                        label='Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <TextField
                        id='password'
                        label='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <TextField
                        id='comfirm-password'
                        label='Confirm Password'
                        value={passwordConfirmation}
                        onChange={e => setConfirmPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <Button
                        variant='contained'
                        onClick={handleSubmission}
                    >
                        Login
                    </Button>
                </Stack>
            </Paper>
        </>
    );
};

export default Signup;