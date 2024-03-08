import {createSlice} from "@reduxjs/toolkit";
import * as I from './interfaces';
import {ISelectGroup, ISetGroups} from "./interfaces";
import {IGroup} from "../../types";

const initialState: I.IGroupsState = {
    groups: [],
    selectedGroup: null
};

export const groupsSlice = createSlice({
    name: 'getGroups',
    initialState,
    reducers: {
        setGroups: (state, action: ISetGroups) => {
            state.groups = action.payload;
        },
        selectGroup: (state, action: ISelectGroup) => {
            state.selectedGroup = action.payload;
        },
        // clear: () => {
        //     return initialState;
        // }
    }
})

export const groupsActions = {...groupsSlice.actions};
export const reducer = groupsSlice.reducer;