import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:[]
}
const Reducer = createSlice({
    name:'mainReducer',
    initialState,
    reducers:{
        addUser:(state,{payload})=>{
            console.log(payload,'inside reducer function')
            state.user = [...state.user,payload]
        }
    }
})
export const {addUser} = Reducer.actions
export default Reducer.reducer