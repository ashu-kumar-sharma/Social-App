import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchcomplain} from "../../Actions/complain";
import ComplainThread from "./complainThread";


class ComplainTable extends Component {
    componentDidMount(){
        this.props.fetchcomplain();

    };
    state={
        filter:'Most Recent'
    };
    handleChange = (e)=>{
        this.setState({
            filter: e.target.value
        })
    };
    handleFilterChange = (event)=>{
        this.setState({
            filter: event.target.value
        })
    };
    render() {
        const {complain} = this.props;
        const {filter} = this.state;
        return (
            <div className={'table-responsive-md'}>
                <div className="complainFilter">
                    <h5>Your Complains</h5>
                    <div className={'filter-block'}>
                        <i className="fas fa-filter"></i>
                        <select onChange={this.handleFilterChange}>
                            <option value="Most Recent" defaultValue>Most Recent Complains</option>
                            <option value="Open">Open Complains</option>
                            <option value="Pending">Pending Complains</option>
                            <option value="Resolved">Resolved Complains</option>
                        </select>
                    </div>
                </div>
                {
                    (complain.length)?
                        <table className="table">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">Department</th>
                                <th scope="col">Issue Id</th>
                                <th scope="col">Locked By</th>
                                <th scope="col">Assigned To</th>
                                <th scope="col">Status</th>
                            </tr>
                            </thead>
                            {
                                complain.map((item,id) => {
                                    if(filter === 'Most Recent'){
                                        return (
                                            <ComplainThread
                                                complain={item}
                                                key={id}
                                            />
                                        )
                                    }
                                    else if(filter === item.status){
                                        return (
                                            <ComplainThread
                                                complain={item}
                                                key={id}
                                            />
                                        )
                                    }
                                    else if(filter === item.status){
                                        return (
                                            <ComplainThread
                                                complain={item}
                                                key={id}
                                            />
                                        )
                                    }
                                    else if(filter === item.status){
                                        return (
                                            <ComplainThread
                                                complain={item}
                                                key={id}
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

const mapStatesToProps = (state)=>{
    return{
        complain: state.complain.complains
    }
};
const mapDispatchToProps = {
    fetchcomplain
};
export default connect(mapStatesToProps,mapDispatchToProps)(ComplainTable);