import React, {Component} from "react";
import Cookies from 'js-cookie';
import {NavLink} from "react-router-dom";
import './nav.css'

export default class Navbar extends Component{
    handleLogout = ()=>{
        Cookies.remove('token');
    };
    render(){
        return(
            <nav className="navbar navbar-inverse bg-dark fixed-top">
                    <div className="navbar-header">
                        <NavLink to={'/buzz'} className="navlinks d-flex">
                            <img src={'https://i.ibb.co/wLPRYJc/logo.png'} alt={'brand-logo'} width={'60px'} height={'40px'}/>
                            <h4>Social Buzz</h4>
                        </NavLink>
                    </div>
                    <ul className="nav navbar-nav">
                        <li><NavLink to={'/'} onClick={this.handleLogout} className={'navlinks'}><i className="fas fa-sign-out-alt 2x"> </i>  Logout</NavLink></li>
                    </ul>
            </nav>
        )
    }
}