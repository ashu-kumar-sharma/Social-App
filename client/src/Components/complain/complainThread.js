import React from 'react';

const ComplainThread = (props)=>{
    const {complain} = props;
    return (
        <tbody>
            <tr>
                <td>{complain.department}</td>
                <td>
                    <button
                        type="button"
                        className="btn modal-btn"
                        data-toggle="modal"
                        data-target={`#myModal${complain._id}`}
                        style={{'color':'dodgerblue'}}
                    >
                        {complain._id}
                    </button>
                        <div className="modal fade" id={`myModal${complain._id}`}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Complain Details</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <table style={{'width':'100%','border':'1px solid grey','borderSpacing':'5px'}}>
                                        <tbody>
                                        <tr style={{'border':'none%'}}>
                                            <th>Issue ID</th>
                                            <td>{complain._id}</td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td style={{'wordBreak':'break-all'}}>{complain.title}</td>
                                        </tr>
                                        <tr>
                                            <th>Details</th>
                                            <td style={{'wordBreak':'break-all'}}>{complain.body}</td>
                                        </tr>
                                        {(complain.image)?
                                            <tr>
                                                <th>Image</th>
                                                <td><img src={complain.image} width={'100px'} height={'100px'} alt={'complain'}/></td>
                                            </tr>
                                            :null
                                        }
                                        <tr>
                                            <th>Department</th>
                                            <td>{complain.department}</td>
                                        </tr>
                                        <tr>
                                            <th>Raised By</th>
                                            <td>{complain.username}</td>
                                        </tr>
                                        <tr>
                                            <th>Assigned To</th>
                                            <td>{complain.assigned_to}</td>
                                        </tr>
                                        <tr>
                                            <th>Status</th>
                                            <td>{complain.status}</td>
                                        </tr>

                                        </tbody>
                                    </table>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </td>
                <td>{complain.username}</td>
                <td>{complain.assigned_to}</td>
                <td>{complain.status}</td>
            </tr>
        </tbody>
    )
};

export default ComplainThread;