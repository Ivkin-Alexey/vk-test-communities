import {IGroup, User} from "../../types";

interface IAction<P> {
    type: string;
    payload: P;
}

export type IGroups = IGroup[];
export type IFriends = User[];

export interface ISelectedGroup {
    name: string;
    friends: IFriends;
}

export interface IGroupsState {
    groups: IGroup[] | [];
    selectedGroup: ISelectedGroup | null;
}

export type ISetGroups = IAction<IGroups>;
export type ISelectGroup = IAction<ISelectedGroup>;