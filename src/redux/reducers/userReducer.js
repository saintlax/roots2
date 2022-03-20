import {ActionTypes} from "../constants/action-types"
const initialState = {
    users: [
        {
            id: 1,
            name: "Chika Anthony"
        },
        {
            id: 2,
            name: "Harry Songs"
        }
    ]
};
export const userReducer = (state= initialState, {type,payload}) =>{
    switch(type){
        case ActionTypes.SET_USERS:
            return state;
            default:
                return state;
    }
}