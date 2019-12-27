import React from 'react';
import './not_found.css';
import {NavLink} from "react-router-dom";

const Notfound =() => (
    <div className="notfound">
        <h2>404 ERROR!!!!!!</h2>
        <h3>PAGE NOT FOUND</h3>
        <img src={'https://i.giphy.com/media/26gR0BZV9XBavwbyE/giphy.webp'} width={'40%'} height={'35%'} alt={'Page Not Found'}/>
        <NavLink to={'/buzz'} style={{'color':'blue'}}>Click me </NavLink>to redirect to home page
    </div>
);


export default Notfound;