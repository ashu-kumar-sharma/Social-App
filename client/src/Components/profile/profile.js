import React, {Component} from 'react';
import './profile.css';
import {connect} from 'react-redux'
import Sidebar from "../sidebar/sidebar";

import {fetchUser} from "../../Actions/user";

class Profile extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        const {user} = this.props.user;
        return (
            <>
                <div className={'profile'}>
                    <div className={'profile-cover'}>
                    </div>
                    <div className={"profile-img"}>
                        <img src={user.p_image} alt={'profile'} className={'p-image'}/>
                    </div>
                    <div className={'profile-data'}>
                        <h4 className={'text-center'}>{user.username}</h4>
                        <h6>{user.email}</h6>
                        <Sidebar role={user.role}/>
                    </div>
                </div>
            </>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        user: state.user
    }
};
const mapDispatchToProps = {
    fetchUser
};
export default connect(mapStateToProps , mapDispatchToProps)(Profile);
