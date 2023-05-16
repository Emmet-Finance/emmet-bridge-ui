import { createSlice } from "@reduxjs/toolkit";

export const bridgeSlice = createSlice({
    name:"bridge",
    initialState:{
        fromChain:'',
        toChain:'',
    },
    reducers:{
        setFromCahin:(state:any, action) => {
            state.fromChain = action.payload;
        },
        setToChain:(state:any, action) => {
            state.toChain = action.payload;
        }
    }
});

export const {setFromCahin, setToChain} = bridgeSlice.actions;