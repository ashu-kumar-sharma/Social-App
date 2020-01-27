import React, {Component} from 'react';
import Login from './Components/Login/login';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import AppRoutes from './Components/pageRoute/appRoutes';
import './App.css';
import Cookies from 'js-cookie';
import NotFound from "./Components/notfound/notfound";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false
        }
    }

    componentWillMount() {
        // this.checkAuth();
        // if (this.state.isAuth) {
        //     console.log("hererererer")
            this.props.history.push('/buzz');
        // }
    }

    checkAuth = () => {
        if (Cookies.get('token')) {
            this.setState({
                isAuth: true
            })
        }
    };

    render() {
        return (
            <div className={'dashboard'}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={'/'} component={Login}/>
                        <PrivateRoute component={AppRoutes} isAuth={this.state.isAuth}/>
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

const PrivateRoute = ({component: Component, ...rest}) => {
    const {isAuth} = rest;
    return (
        <Route
            render={(props) =>
                isAuth ? <Component/> : <Redirect to={{pathname: '/'}}/>
            }
        />
    );
};
export default App;

