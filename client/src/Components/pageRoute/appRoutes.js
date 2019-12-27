import React, {Component, Fragment} from 'react';
import { Redirect, Route , Switch} from "react-router-dom";
import Complain from "../complain/complain";
import Buzz from "../post/buzz";
import Settings from "../setting/settings";
import Resolve from "../resolve/resolve";
import Profile from "../profile/profile";
import Navbar from "../navbar/navbar";
import {connect} from "react-redux";
import Cookies from "js-cookie";
import NotFound from "../notfound/notfound";

class AppRoutes extends Component
{
    logout= (e)=>{
        e.preventDefault();
        Cookies.remove("userId");
    };
    render()
    {
        return (
            <Fragment>
                <Navbar logout={this.logout}/>
                <div className="row main-container">
                    <div className="col-md-3">
                        <Profile/>
                    </div>
                    <div className="col-md-9">
                        <Switch>
                            <Route path={'/buzz'} component={Buzz}/>
                            <Route path={'/complain'} component={Complain}/>
                            <PrivateRoute component={Resolve} path={'/resolve'} role={this.props.user.user.role}/>
                            <PrivateRoute component={Settings} path={'/setting'} role={this.props.user.user.role}/>
                            {/*route for bad request*/}
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </div>
            </Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        user: state.user
    };
};

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { role } = rest;
    return (
        <Route
            render={(props) =>
                (role === 'SuperAdmin')||(role === 'Others')||(role === 'Hardware')||(role === 'Infrastructure')
                    ?
                    <Component  role={role}/>
                    :
                    <Redirect to={'/buzz'}/>
            }
        />
    );
};
export default connect(mapStateToProps)(AppRoutes);
