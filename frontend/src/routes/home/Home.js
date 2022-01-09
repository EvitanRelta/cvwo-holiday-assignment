import React from 'react';
import { Link } from "react-router-dom";

const Home = () => (
    <>
    <h1>Home page</h1>
    <Link to='/login'>Login</Link>
    </>
);

export default Home;