import {IGroup} from "../types";
import {CustomSelectOptionInterface} from "@vkontakte/vkui";
import {IFilters} from "../redux/Groups/interfaces";

export function utils(arr: IGroup[], defaultOptions: CustomSelectOptionInterface[]): CustomSelectOptionInterface[] {
    const newArr: string[] = [];
    arr.forEach((el: IGroup) => {
        if (el.avatar_color) newArr.push(el.avatar_color);
        else newArr.push("without color");
    });
    let result: string[] | CustomSelectOptionInterface[] = Array.from(new Set(newArr));
    result = result.map((el: string) => ({label: el, value: el}));
    result.unshift(defaultOptions[0]);
    return result;
}

export function filterGroups(groups: IGroup[], filters: IFilters) {
    const {onlyWithFriends, closed, color} = filters;
    let arr: IGroup[] = [...groups];
    if (onlyWithFriends) arr = arr.filter(el => el.friends);
    if (closed) arr = arr.filter(el => el.closed);
    if (closed === false) arr = arr.filter(el => !el.closed);
    if (color !== "all") {
        if (color === "without color") arr = arr.filter(el => !el.avatar_color);
        else arr = arr.filter(el => el.avatar_color === filters.color);
    }
    return arr;
}