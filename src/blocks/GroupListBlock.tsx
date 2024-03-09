import React from 'react';
import {Group, Header, Spinner} from "@vkontakte/vkui";
import {IActivePanel, IGroup} from "../types";
import {GroupItem} from "../components";
import {useAppSelector} from "../hooks/redux";

interface IGroupListBlock {
    setPanel(panel: IActivePanel): void;
    displayedGroups: IGroup[];
}

export const GroupListBlock = ({setPanel, displayedGroups}: IGroupListBlock) => {

    const {groups} = useAppSelector(state => state.groups);

    function renderGroupList() {
        return displayedGroups.map((el: IGroup, i: number) => {
            return <GroupItem {...el} setPanel={setPanel} key={i}/>
        })
    }

    return (
        <Group header={<Header mode="secondary">Группы: {displayedGroups.length}</Header>}>
            {displayedGroups.length > 0 ?
                renderGroupList() :
                groups.length > 0 ? <p style={{margin: "0 auto"}}>Выбранные группы отсутствуют</p> :
                    <Spinner size="large" style={{margin: '20px 0'}}/>
            }
        </Group>
    );
};