import axiosInstance from '../utils/axios_intreceptor';
import {ADD_POST, FETCH_POSTS, FETCH_NOTIFICATION, DELETE_POST, LIKE, DISLIKE} from "./actionTypes";
import {postUrl} from '../utils/constants';
import {errorAlert, toast} from '../utils/actionAlerts';

export const displayPost = (data) => ({
    type: FETCH_POSTS,
    payload: data
});

export const fetchPost = (skip) => {
    return async dispatch => {
        const res = await axiosInstance.get(`${postUrl}/fetchPost/${skip}`);
        if (res.status === 'failed') {
            errorAlert('Somthing Went Wrong!! Try Again');
        } else {
            dispatch(displayPost(res.data));
        }
    }
};

export const addPost = (data) => ({
    type: ADD_POST,
    payload: data
});

export const savePost = (data) => {
    return async dispatch => {
        const response = await axiosInstance.post(`${postUrl}/savePost/`, data);
        if (response.status === 'failed') {
            errorAlert('Somthing Went Wrong!! Try Again');
        } else {
            dispatch(addPost(response.data));
            toast('Your buzz Is Posted');
            getNotification();
        }


    }
};

//fetch notification post
export const getNotification = () => {
    return async dispatch => {
        const response = await axiosInstance.get(`${postUrl}/getNotification`);
        if (response.status === 'failed') {
            errorAlert('Somthing Went Wrong!! Try Again');
        } else {
            dispatch({
                type: FETCH_NOTIFICATION,
                payload: response.data
            })
        }

    }
};

//delete buzz
export const removePost = (id) => {
    return async dispatch => {
        const response = await axiosInstance.delete(`${postUrl}/removePost/${id}`);
        if (response.status === 'failed') {
            errorAlert('Somthing Went Wrong!! Try Again');
        } else {
            dispatch({
                type: DELETE_POST,
                payload: response.data
            });
            toast('Your buzz Is Deleted');
        }

    }
};

//like action
export const likeButton = (id) => {
    return async dispatch => {
        const response = await axiosInstance.patch(`${postUrl}/like/${id}`);
        if (response.status === 'failed') {
            errorAlert('Somthing Went Wrong!! Try Again');
        } else {
            dispatch({
                type: LIKE,
                payload: response.data
            })
        }
    }
};

//dislike action
export const dislikeButton = (id) => {
    return async dispatch => {
        const response = await axiosInstance.patch(`${postUrl}/dislike/${id}`);
        if (response.status === 'failed') {
            errorAlert('Somthing Went Wrong!! Try Again');
        } else {
            dispatch({
                type: DISLIKE,
                payload: response.data
            })
        }
    }
};