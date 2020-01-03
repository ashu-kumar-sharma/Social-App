import React, {Component, Fragment} from 'react';
import './sidebar.css';
import { NavLink } from 'react-router-dom';

export default class Sidebar extends Component {
    render() {
        const {role} = this.props;
        return (
            <Fragment>
                <ul className="list-group mt-4">
                    <NavLink to="/buzz" className="list-group-item">
                        <span className="float-left"><i className="fas fa-blog"></i> BUZZ</span>
                        <span className="float-right"> <i className="fas fa-chevron-right"> </i> </span>
                    </NavLink>
                    <NavLink to="/complain" className="list-group-item">
                        <span className="float-left"><i className="fas fa-exclamation-triangle"></i> COMPLAINTS</span>
                        <span className="float-right"> <i className="fas fa-chevron-right"> </i> </span>
                    </NavLink>
                    {(role === "SuperAdmin") || (role === 'Others') || (role === 'Hardware') || (role === 'Infrastructure') ?
                        <NavLink to="/resolve" className="list-group-item">
                            <span className="float-left"><i className="fas fa-check-circle"></i> RESOLVED</span>
                            <span className="float-right"> <i className="fas fa-chevron-right"> </i> </span>
                        </NavLink>
                        : null
                    }
                    {
                        (role === 'SuperAdmin')?
                            <NavLink to="/setting" className="list-group-item">
                                <span className="float-left"><i className="fas fa-user-cog"></i> USER SETTINGS</span>
                                <span className="float-right"> <i className="fas fa-chevron-right"> </i> </span>
                            </NavLink>
                            : null
                    }
                </ul>
                <div className={'footer'}>
                    <p>&copy;2019 Social Buzz</p>
                    <a>About Us</a>
                </div>
            </Fragment>
        );
    }
}
