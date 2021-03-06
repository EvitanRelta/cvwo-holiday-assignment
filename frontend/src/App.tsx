import React, { useEffect } from 'react';
import { Login, Signup, AllTasks, TasksByTag } from './pages';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CircularProgress, CssBaseline } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/rootReducer';
import { darkTheme, lightTheme } from './themes';
import tryLoginFromCookies from './store/user/thunkActionCreators/tryLoginFromCookies';
import { Center } from './pages/components';
import { AppBarWrapper } from './pages/main/components';
import { RequireAuth, RequireUnauth } from './routeComponents';
import UntaggedTasks from './pages/main/UntaggedTasks';


const App = () => {
    const isDarkMode = useSelector((state: RootState) => state.isDarkMode);
    const userState = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tryLoginFromCookies())
    }, []);
    
    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            {userState.loggingInFromCookies
                ? (
                    <Center>
                        <CircularProgress size={80} />
                    </Center>
                )
                : (
                    <Routes>
                        <Route path='/' element={<Navigate to='login' />} />
                        <Route element={<RequireUnauth />}>
                            <Route path='login' element={<Login />} />
                            <Route path='signup' element={<Signup />} />
                        </Route>
                        <Route element={<RequireAuth />}>
                            <Route element={<AppBarWrapper />}>
                                <Route path='all' element={<AllTasks />} />
                                <Route path='tag/:id' element={<TasksByTag />} />
                                <Route path='untagged' element={<UntaggedTasks />} />
                            </Route>
                        </Route>
                    </Routes>
                )
            }
        </ThemeProvider>
    );
};

export default App;