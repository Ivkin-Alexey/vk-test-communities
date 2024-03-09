import React from 'react';
import {SimpleCell, Avatar, Link} from "@vkontakte/vkui";
import {IActivePanel, IGroup} from "../types";
import {useDispatch} from "react-redux";
import {groupsActions} from "../redux/Groups/slice";

interface IGroupItem extends IGroup {
    setPanel(panel: IActivePanel): void;
}

export const GroupItem: React.FC<IGroupItem> = (props: IGroupItem) => {
    const {name, setPanel, friends, members_count, avatar_color, closed} = props;

    const dispatch = useDispatch();

    function renderSimpleCellChildren() {
        return (
            <div style={{display: "flex", justifyContent: "space-between", gap: '20px'}}>
                <p><b>{name}</b></p>
                {closed ? <p>Закрытая группа</p> : <p>Открытая группа</p>}
                {members_count > 0 && <p>Подписчиков: {members_count}</p>}
                {friends && <p>Друзей: {<Link onClick={() => {
                    setPanel('friends');
                    dispatch(groupsActions.selectGroup({name, friends}))
                }}>{friends?.length}</Link>}</p>}
            </div>
        )
    }

    return (
        <SimpleCell
            expandable="auto"
            before={<Avatar size={100} style={{backgroundColor: avatar_color}}/>}>
            {renderSimpleCellChildren()}
        </SimpleCell>
    );
};