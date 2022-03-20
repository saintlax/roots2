import {ActionTypes} from "../constants/action-types"
const initialState = {
    products:[
        {id: 1, name: "Chioma Udeh", category: "DEV"}
    ]
}
export const productReducer = (state = initialState, {type, payload}) =>{
    
    switch(type){
        case ActionTypes.SET_PRODUCTS:
            return state;
        default:
            return state;
    }
}