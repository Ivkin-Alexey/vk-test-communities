import {IGroup, IUser} from "../../types";

interface IAction<P> {
    type: string;
    payload: P;
}

export type IGroups = IGroup[];
export type IFriends = IUser[];

export interface ISelectedGroup {
    name: string;
    friends: IFriends;
}

export interface IFilters {
    color: string ;
    closed: boolean | null;
    onlyWithFriends: boolean;
}

export interface IGroupsState {
    groups: IGroup[] | [];
    selectedGroup: ISelectedGroup | null;
    filters: IFilters
}

export type ISetGroups = IAction<IGroups>;
export type ISelectGroup = IAction<ISelectedGroup>;
export type ISetFilters = IAction<IFilters>;