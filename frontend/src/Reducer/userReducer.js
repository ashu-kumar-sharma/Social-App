import { FETCH_USER, FETCH_ALL_USER, CHANGE_ROLE } from '../Actions/actionTypes';

const initialState = {
    user : {},
    allUser: []
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER:
            return { ...state, user: action.payload };
        case FETCH_ALL_USER:
            return {...state,allUser: action.payload };
        case CHANGE_ROLE:
            let id= action.payload._id;
            const newUsers = state.allUser.map(item=>item._id===id? action.payload:item);
            console.log('newComplain',newUsers);
            return {...state, allUser: newUsers };
        default : return state
    }
}