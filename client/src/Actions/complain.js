import axiosInstance from '../utils/axios_intreceptor';
import { errorAlert, toast } from '../utils/actionAlerts';
import {complainUrl} from '../utils/constants';
import {CHANGE_STATUS, FETCH_ALL_COMPLAIN, FETCH_COMPLAIN, FILE_COMPLAIN,FETCH_DEPARTMENT_COMPLAIN} from './actionTypes';

export const displayComplain = (data)=>({
    type : FETCH_COMPLAIN,
    payload : data
});

export const fetchcomplain = ()=>{
    return async dispatch =>{
        const res = await axiosInstance.get(`${complainUrl}/getcomplain/`);
        if(res.status=== 'failed'){
            errorAlert('Somthing Went Wrong!! Try Again');
        }
        else{
            dispatch(displayComplain(res.data));
        }

    }

};

export const saveComplain = (data)=>({
    type : FILE_COMPLAIN,
    payload : data
});

export const fileComplain = (data)=>{
    return async dispatch =>{
        const response = await axiosInstance.post(`${complainUrl}/fileComplain/`,data);
        if(response.status==='failed'){
            errorAlert('Somthing Went Wrong!! Try Again');
        }
        else{
            dispatch(saveComplain(response.data));
            toast('Your Complain is Filed');
        }
    }
};

export const displayAllComplain = (data)=>({
    type : FETCH_ALL_COMPLAIN,
    payload : data
});

export const fetchAllComplain =()=>{
    return async dispatch =>{
        const response = await axiosInstance.get(`${complainUrl}/fetchAll/`);
        dispatch(displayAllComplain(response.data));
    }
};

export const actionChange=(data)=>({
    type: CHANGE_STATUS,
    payload : data
});

export const changeStatus = (id,data)=>{
    return async dispatch =>{
        const response = await axiosInstance.patch(`${complainUrl}/changestatus/${id}`,{data});
        if(response.status==='failed'){
            errorAlert('Somthing Went Wrong!! Try Again');
        }
        else{
            dispatch(actionChange(response.data));
            toast('Complain Status Changed Successfully');
        }
    }
};

export const fetchDepartmentComplain =(data)=>{

    return async dispatch =>{
        const response = await axiosInstance.get(`${complainUrl}/fetchDepartmentComplain/?email=${data}`);

        dispatch({
            type : FETCH_DEPARTMENT_COMPLAIN,
            payload : response.data
        });
    }
};