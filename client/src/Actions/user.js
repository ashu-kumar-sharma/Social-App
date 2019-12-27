import {FETCH_USER, FETCH_ALL_USER, CHANGE_ROLE} from "./actionTypes";
import axiosInstance from '../utils/axios_intreceptor';
import {errorAlert, toast} from "../utils/actionAlerts";
import { userUrl} from '../utils/constants';

const getUser = (data) => ({
    type: FETCH_USER,
    payload: data
});
export const fetchUser = ()=>{
    return async dispatch => {
        const res = await axiosInstance.get(`${userUrl}`);
        if( res.status === 'failed'){
            errorAlert('Something Went Wrong!! Try Again Later');
        }
        else{
            dispatch( getUser(res.data));
        }
}};

export const fetchAllUser = ()=>{
    return async dispatch => {
        const res = await axiosInstance.get( `${userUrl}/fetchAll`);
        if( res.status === 'failed'){
            errorAlert('Something Went Wrong!! Try Again Later');
        }
        else{
            dispatch({
                type: FETCH_ALL_USER,
                payload: res.data
            })
        }
    }
};
export const changeRoll = (id,data)=>{
    return async  dispatch => {
        const res = await axiosInstance.patch(`${userUrl}/changeRole/${id}`,{data});
        if( res.status === 'failed'){
            errorAlert('Something Went Wrong!! Try Again Later');
        }
        else{
            toast('Role Changed Successfully');
            dispatch({
                type: CHANGE_ROLE,
                payload: res.data
            })
        }
    }
}