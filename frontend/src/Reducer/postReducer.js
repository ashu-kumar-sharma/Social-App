import {ADD_POST, DELETE_POST, FETCH_NOTIFICATION, FETCH_POSTS, LIKE, DISLIKE} from "../Actions/actionTypes";

const initialState = {
    post: [],
    notification: []
};

export const postReducer = (state = initialState,action)=>{
    switch(action.type){

        case FETCH_POSTS:
            const morePost = state.post.concat(...action.payload);
            return{ ...state,post: morePost};
        case ADD_POST:
            return { ...state, post: [action.payload,...state.post],notification: [action.payload,...state.post]};

        case DELETE_POST:
            state.post=state.post.filter((post)=>{
                if(post._id !== action.payload){
                    return post
                }
            });
            return { ...state, post: state.post };

        case FETCH_NOTIFICATION:
            return { ...state, notification: action.payload};

        case LIKE:
            const latestPost = state.post.map((item)=>(item._id === action.payload._id)? action.payload : item);
            return { ...state, post: latestPost };

        case DISLIKE:
            const newPost = state.post.map((item)=>{
                if(item._id === action.payload._id){
                    return action.payload;
                }
                else{
                    return item;
                }
            });
            return { ...state, post: newPost };

        default:return state;
    }
}