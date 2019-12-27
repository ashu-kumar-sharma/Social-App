import React, {Component} from 'react';
import {connect} from "react-redux";
import './resolve.css';
import {fetchAllComplain, changeStatus,fetchDepartmentComplain} from '../../Actions/complain';
import ComplainThread from "./complainThread";

class Resolve extends Component {
    constructor(props){
        super(props);
        this.state={
            newStatus: "",
            filter: "All"
        }
    }
    componentDidMount(){
        if(this.props.role==='SuperAdmin'){
            this.props.fetchAllComplain();
        }
        else{
            this.props.fetchDepartmentComplain(this.props.user.user.email);
        }
    };
    handleChange=(event,id)=>{
        this.setState({
            newStatus: event.target.value
        })

        this.props.changeStatus(id,event.target.value);
        this.setState({
            newStatus: ''
        })
    };
    handleFilterChange = (event)=>{
        this.setState({
            filter: event.target.value
        })
    };

    render() {
        const {complain} = this.props;
        const {filter,newStatus} = this.state;
        return (
            <div className={"table-responsive-md"}>
                <div className="complainFilter">
                    <h5>Complains Assigned To You</h5>
                    <div className={'filter-block'}>
                        <i className="fas fa-filter"></i>
                        <select onChange={this.handleFilterChange}>
                            <option value="All" defaultValue>Most Recent Complains</option>
                            <option value="Open">Open Complains</option>
                            <option value="Pending">Pending Complains</option>
                            <option value="Resolved">Resolved Complains</option>
                        </select>
                    </div>
                </div>
                {
                    (complain.length)?
                        <table className="table border rounded">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">Department</th>
                                <th scope="col">Issue Id</th>
                                <th scope="col">Locked By</th>
                                <th scope="col">Assigned To</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            {
                                complain.map((item,id) => {
                                    if(filter === 'All'){
                                        return (
                                            <ComplainThread
                                                key={id}
                                                complain={item}
                                                handleChange={this.handleChange}
                                                newStatus={newStatus}
                                            />
                                        )
                                    }
                                    else if(filter === item.status){
                                        return (
                                            <ComplainThread
                                                key={id}
                                                complain={item}
                                                handleChange={this.handleChange}
                                                newStatus={newStatus}
                                            />
                                        )
                                    }
                                    else if(filter === item.status){
                                        return (
                                            <ComplainThread
                                                key={id}
                                                complain={item}
                                                handleChange={this.handleChange}
                                                newStatus={newStatus}
                                            />
                                        )
                                    }
                                    else if(filter === item.status){
                                        return (
                                            <ComplainThread
                                                key={id}
                                                complain={item}
                                                handleChange={this.handleChange}
                                                newStatus={newStatus}
                                            />
                                        )
                                    }
                                })
                            }
                        </table>
                        :
                        <h4 style={{'textAlign':'center'}}>No Complains Found</h4>

                }

            </div>
        );
    }
}

const mapStatesToProps= (state)=>{
    return {
        user: state.user,
        complain: state.complain.allComplains
    }
};
const mapDispatchToProps={
    fetchAllComplain,
    fetchDepartmentComplain,
    changeStatus
};



export default connect(mapStatesToProps,mapDispatchToProps)(Resolve);