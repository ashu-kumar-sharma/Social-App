import React, {Component} from 'react';
import UserThread from './userThread';
import {fetchAllUser, changeRoll} from "../../Actions/user";
import {connect} from "react-redux";

class Settings extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={
    //         newRole: '',
    //     }
    // }
    componentDidMount(){
        this.props.fetchAllUser();
        console.log("userr",this.props.allUser);

    };
    state={
        filter:'ALL'
    };
    handleChange = (e)=>{
        this.setState({
            filter: e.target.value
        })
    };
    handleRoleChange = (event,id)=>{
        this.props.changeRoll(id,event.target.value);
        // this.setState({
        //     newRole: ''
        // })
    };
    render() {
        const { allUser } = this.props;
        console.log("userr",allUser);
        const {filter} = this.state;
        return (
            <div className={'table-responsive-md'}>
                <div className="complainFilter">
                    <h5>Users</h5>
                    <div className={'filter-block'}>
                        <i className="fas fa-filter"></i>
                        <select onChange={this.handleChange}>
                            <option value="ALL" defaultValue>All User</option>
                            <option value="Hardware">Hardware Department User</option>
                            <option value="Infrastructure">Infrastructure Department User</option>
                            <option value="Others">Others Department User</option>
                        </select>
                    </div>
                </div>
                {
                    (allUser.length)?
                        <table className="table">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">User Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            {
                                allUser.map((item,id) => {
                                    if(filter === 'ALL' && item.role !== 'SuperAdmin'){
                                        return (
                                            <UserThread
                                                user={item}
                                                handleRoleChange={this.handleRoleChange}
                                                key={id}
                                            />
                                        )
                                    }
                                    else if(filter === item.role ){
                                        return (
                                            <UserThread
                                                user={item}
                                                handleRoleChange={this.handleRoleChange}
                                                key={id}
                                            />
                                        )
                                    }
                                    else if(filter === item.role){
                                        return (
                                            <UserThread
                                                user={item}
                                                handleRoleChange={this.handleRoleChange}
                                                key={id}
                                            />
                                        )
                                    }
                                    else if(filter ===   item.role){
                                        return (
                                            <UserThread
                                                user={item}
                                                handleRoleChange={this.handleRoleChange}
                                                key={id}
                                            />
                                        )
                                    }
                                })
                            }
                        </table>
                        :
                        <h4 style={{'text-align':'center'}}>No Complains Found</h4>
                }

            </div>
        );
    }
}


const mapStatesToProps = (states)=>{
    return{
        allUser: states.user.allUser
    }
};
const mapDispatchToProps = {
    fetchAllUser,
    changeRoll
};
export default connect(mapStatesToProps,mapDispatchToProps)(Settings);