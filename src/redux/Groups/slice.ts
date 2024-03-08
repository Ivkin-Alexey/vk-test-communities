import {createSlice} from "@reduxjs/toolkit";
import * as I from './interfaces';
import {ISetGroups} from "./interfaces";

const initialState: I.IGroupsState = {
    groups: []
};

export const groupsSlice = createSlice({
    name: 'getGroups',
    initialState,
    reducers: {
        setGroups: (state, action: ISetGroups) => {
            state.groups = action.payload;
        },
        // clear: () => {
        //     return initialState;
        // }
    }
})

export const groupsActions = {...groupsSlice.actions};
export const reducer = groupsSlice.reducer;