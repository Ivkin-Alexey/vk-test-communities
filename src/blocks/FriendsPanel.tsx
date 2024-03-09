import React from 'react';
import {Avatar, Cell, List, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import {IActivePanel, IUser} from "../types";
import {useAppSelector} from "../hooks/redux";

interface IFriendsPanel {
    setPanel(panel: IActivePanel): void;
}

export const FriendsPanel = ({setPanel}: IFriendsPanel) => {
    const {selectedGroup} = useAppSelector(state => state.groups);

    return (
        <>
            <PanelHeader before={<PanelHeaderBack onClick={() => setPanel('main')}/>}>
                Друзья в группе "{selectedGroup?.name}"
            </PanelHeader>
            <List>
                {selectedGroup?.friends.map((item: IUser) => {
                    const {first_name, last_name} = item;
                    return <Cell key={first_name} before={<Avatar/>}>
                        {first_name + " " + last_name}
                    </Cell>
                })}
            </List>
        </>
    );
};