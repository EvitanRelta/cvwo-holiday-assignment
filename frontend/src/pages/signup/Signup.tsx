import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Stack, TextField, Typography, IconButton, Link, Box, Alert, CircularProgress } from '@mui/material';
import { DarkMode, Email, NineK, Password } from '@mui/icons-material';
import { PwVisibilityIconAdornment, LoginSignupContainer, ErrorAlert } from '../components';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { RootState } from '../../store/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import toggleDarkMode from '../../store/isDarkMode/thunkActionCreators/toggleDarkMode';
import emailSignup from '../../store/user/thunkActionCreators/emailSignup';
import setEmailSignupError from '../../store/user/basicActionCreators/setEmailSignupError';
import clearLoginSignupErrors from '../../store/user/basicActionCreators/clearLoginSignupErrors';


interface SignupProps {}

const Signup = ({}: SignupProps) => {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPwVisible, setIsConfirmPwVisible] = useState(false);

    const [hasNicknameError, setHasNicknameError] = useState(false);
    const [hasEmailError, setHasEmailError] = useState(false);
    const [hasPasswordError, setHasPasswordError] = useState(false);
    const [hasPasswordConfirmationError, setHasPasswordConfirmationError] = useState(false);

    const userState = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const handleSubmission = async () => {
        setHasNicknameError(!Boolean(nickname));
        setHasEmailError(!Boolean(email));
        setHasPasswordError(!Boolean(password));
        setHasPasswordConfirmationError(!Boolean(passwordConfirmation));
        if (!nickname || !email || !password || !passwordConfirmation)
            return;
        if (password !== passwordConfirmation) {
            setHasPasswordError(true);
            setHasPasswordConfirmationError(true);
            dispatch(setEmailSignupError('Passwords don\'t match.'));
            return;
        }
        dispatch(emailSignup(email, password, passwordConfirmation, { nickname }));
    };
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key !== 'Enter') return;
        handleSubmission()
    };

    useEffect(() => {
        const clearErrorsOnNavigate = () => { dispatch(clearLoginSignupErrors()) };
        return clearErrorsOnNavigate;
    }, []);

    return (
        <LoginSignupContainer>
            <Stack spacing={2}>
                <Typography variant='h4'>Sign up</Typography>
                <TextField
                    error={hasNicknameError && !nickname}
                    helperText={(hasNicknameError && !nickname) ? 'Cannot be empty' : ''}
                    disabled={userState.isLoading}
                    color='primary'
                    autoFocus
                    variant='outlined'
                    id='nickname'
                    label='Nickname'
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                    onKeyPress={e => {
                        setHasNicknameError(false);
                        handleKeyPress(e);
                    }}
                />
                <TextField
                    error={hasEmailError && !email}
                    helperText={(hasEmailError && !email) ? 'Cannot be empty' : ''}
                    disabled={userState.isLoading}
                    color='primary'
                    variant='outlined'
                    id='email'
                    label='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyPress={e => {
                        setHasEmailError(false);
                        handleKeyPress(e);
                    }}
                />
                <TextField
                    error={hasPasswordError}
                    helperText={(hasPasswordError && !password) ? 'Cannot be empty' : ''}
                    disabled={userState.isLoading}
                    variant='outlined'
                    id='password'
                    label='Password'
                    type={isPasswordVisible ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyPress={e => {
                        setHasPasswordError(false);
                        handleKeyPress(e);
                    }}
                    InputProps={{
                        endAdornment: <PwVisibilityIconAdornment
                            isPasswordVisible={isPasswordVisible}
                            onClick={() => setIsPasswordVisible(state => !state)}
                        />
                    }}
                />
                <TextField
                    error={hasPasswordConfirmationError}
                    helperText={(hasPasswordConfirmationError && !passwordConfirmation) ? 'Cannot be empty' : ''}
                    disabled={userState.isLoading}
                    variant='outlined'
                    id='password-confirmation'
                    label='Confirm Password'
                    type={isConfirmPwVisible ? 'text' : 'password'}
                    value={passwordConfirmation}
                    onChange={e => setConfirmPassword(e.target.value)}
                    onKeyPress={e => {
                        setHasPasswordConfirmationError(false);
                        handleKeyPress(e);
                    }}
                    InputProps={{
                        endAdornment: <PwVisibilityIconAdornment
                            isPasswordVisible={isConfirmPwVisible}
                            onClick={() => setIsConfirmPwVisible(state => !state)}
                        />
                    }}
                />
                {userState.signupErrorMessage
                    ? <ErrorAlert text={userState.signupErrorMessage} />
                    : null
                }
                <Button
                    fullWidth
                    variant='contained'
                    onClick={handleSubmission}
                    disabled={userState.isLoading}
                >
                    {userState.isLoading
                        ? <CircularProgress color='inherit' size={24.5} />
                        : 'Sign up'
                    }
                </Button>
                <Box>
                    {userState.isLoading
                        ? <Typography color='hyperlink.disabled' sx={{textDecoration: 'underline'}}>Login to existing account</Typography>
                        : <Link color='hyperlink.main' to='/login' component={RouterLink}>Login to existing account</Link>
                    }
                    <IconButton 
                        onClick={() => dispatch(toggleDarkMode())}
                        sx={{ float: 'right' }}
                        tabIndex={-1}
                    >
                        <DarkMode />
                    </IconButton>
                </Box>
            </Stack>
        </LoginSignupContainer>
    );
};

export default Signup;