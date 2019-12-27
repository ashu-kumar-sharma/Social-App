import {FILE_COMPLAIN, FETCH_COMPLAIN, FETCH_ALL_COMPLAIN,CHANGE_STATUS,FETCH_DEPARTMENT_COMPLAIN} from "../Actions/actionTypes";

const initialState = {
    complains: [],
    allComplains: []
};

export const complainReducer = (state= initialState, action)=>{
    switch (action.type) {
        case FETCH_COMPLAIN:
            return{ ...state, complains: action.payload };

        case FILE_COMPLAIN:
            return{ ...state, complains: [...state.complains,action.payload]};

        case FETCH_ALL_COMPLAIN:
            return{ ...state, allComplains: action.payload};

        case FETCH_DEPARTMENT_COMPLAIN:
            return{ ...state, allComplains: action.payload};

        case CHANGE_STATUS:
            let id= action.payload._id;
            const newComplain = state.allComplains.map(item=>item._id===id? action.payload:item);
            console.log('newComplain',newComplain);
            return{...state,allComplains: newComplain};

        default:
            return state;

    }
}