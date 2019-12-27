import React from 'react';

const UserThread = (props)=>{
    const {user,handleRoleChange} = props;
    console.log("usere======>",user);
    return (
        <tbody>
        <tr>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
                <select
                        onChange={(e)=>{ handleRoleChange(e,user._id)}}
                >
                    <option value={'User'}>User</option>
                    <option value={'Hardware'}>Hardware</option>
                    <option value={'Infrastructure'}>Infrastructure</option>
                    <option value={'Others'}>Others</option>
                </select>
            </td>
        </tr>
        </tbody>
    )
};

export default UserThread;