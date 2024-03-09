import React, {useEffect, useState} from 'react';
import {groupsActions} from "../redux/Groups/slice";
import {useAppDispatch} from "../hooks/redux";
import {fetchGroups} from "../api/api";
import {IActivePanel} from "../types";
import {View, Panel} from '@vkontakte/vkui';
import {FriendsPanel, MainPanel} from "../blocks";

export const HomePage = () => {

    const dispatch = useAppDispatch();

    const [activePanel, setActivePanel] = useState<IActivePanel>('main');

    function getGroups(): void {
        try {
            fetchGroups().then(response => {
                if (response.result === 1 && response.data) {
                    dispatch(groupsActions.setGroups(response.data));
                } else {
                    console.error("Ошибка сервера");
                    throw new Error("Ошибка сервера");

                }
            })
        } catch (e) {
            console.log(e);
            throw new Error("Ошибка сервера");
        }
    }

    useEffect(() => {
        setTimeout(() => getGroups(), 1000);
    }, [])


    return (
        <View activePanel={activePanel}>
            <Panel id="main">
                <MainPanel setPanel={setActivePanel}/>
            </Panel>
            <Panel id="friends">
                <FriendsPanel setPanel={setActivePanel}/>
            </Panel>
        </View>
    );
};
