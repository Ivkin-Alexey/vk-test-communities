import {IGetGroupsResponse} from "../types";

export function fetchGroups() {

        const response: IGetGroupsResponse = {result: 0};

        return fetch("groups.json")
            .then(response => response.json())
            .then(data => {
                    response.result = 1;
                    response.data = data;
                    return response;
            })
}
