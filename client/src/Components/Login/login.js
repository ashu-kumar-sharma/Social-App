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
                    {/* <img src="https://media.licdn.com/dms/image/C560BAQGjUZbDAenjbw/company-logo_200_200/0?e=2159024400&v=beta&t=VWygLAae114Z3RFJJrezUZ930n_if9XVHTQDPXjhSm0"
                         width="100px" height="100px"
                         alt="" className="loginScreenImage"/> */}
                         <h1>TT</h1>
                    <h5 >Create Your Own Buzz</h5>
                    <a href={'http://localhost:8000/login/google'}>
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