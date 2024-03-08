import React, {useEffect} from 'react';
import {groupsActions} from "../redux/Groups/slice";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchGroups} from "../api/api";
import {GetGroupsResponse, Group} from "../types";

export const HomePage = () => {

    const groups = useAppSelector(state => state.groups);

    const dispatch = useAppDispatch();

    function getGroups() {

        try {
            fetchGroups().then(data => {
                dispatch(groupsActions.setGroups(data))
            })
        } catch (e) {
            console.log(e);
        }
    }

    console.log(groups);

    useEffect(() => {
        setTimeout(() => {
            getGroups();
        }, 1000)
    }, [])

    return (
        <div>
        </div>
    );
};