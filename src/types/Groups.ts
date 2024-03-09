export interface GetGroupsResponse {
    result: 1 | 0,
    data?: IGroup[]
}

export interface IGroup {
    "id": number,
    "name": string,
    "closed": boolean,
    "avatar_color"?: string,
    "members_count": number,
    "friends"?: User[]
}

export interface User {
    "first_name": string,
    "last_name": string
}

export type IPrivate = "all" | "onlyOpen" | "onlyClosed" | string;

export type IActivePanel = "friends" | "main";
