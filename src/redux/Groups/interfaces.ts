import {Group} from "../../types";

interface IAction<P> {
    type: string;
    payload: P;
}

export type IGroups = Group[];

export interface IGroupsState {
    groups: Group[];
}

export type ISetGroups = IAction<IGroups>