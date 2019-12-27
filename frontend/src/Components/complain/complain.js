import React, {Component} from 'react';
import ComplainForm from './complainForm';
import ComplainTable from './complainTable';
import './complain.css';

class Complain extends Component {
    render() {
        return (
            <div>
                <ComplainForm />
                <ComplainTable/>
            </div>
        );
    }
}

export default Complain;