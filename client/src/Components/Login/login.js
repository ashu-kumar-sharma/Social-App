import React, {Component} from 'react';
import './style.css';
import Cookies from 'js-cookie';
class Login extends Component {

    componentDidMount() {
        Cookies.get('token') && this.props.history.push('/buzz')
        console.log("in token=============", this.props.location);
    }

    render() {

        return (
            <div className={'background'}>
                <div className="login-card">
                    <img src="https://i.ibb.co/wLPRYJc/logo.png"
                         width="100px" height="80px"
                         alt="" className="loginScreenImage"/>
                         <h1>Socail Buzz</h1>
                    <h5 >Create Your Own Buzz</h5>
                    <a href={'/login/google'}>
                        <button className={"btn btn-danger"}>
                            <i className='fab fa-google'> </i>
                            <span>Sign in with Gmail</span>
                        </button>
                    </a>
                </div>
            </div>
        );
    }
}

export default Login;