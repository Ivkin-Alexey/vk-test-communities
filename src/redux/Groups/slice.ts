import {createSlice} from "@reduxjs/toolkit";
import * as I from './interfaces';
import {ISelectGroup, ISetFilters, ISetGroups} from "./interfaces";

const initialState: I.IGroupsState = {
    groups: [],
    selectedGroup: null,
    filters: {color: "all", closed: null, onlyWithFriends: false}
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
        setFilters: (state, action: ISetFilters) => {
            state.filters = action.payload;
        },
    }
})

export const groupsActions = {...groupsSlice.actions};
export const reducer = groupsSlice.reducer;