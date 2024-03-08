import React from 'react';
import {SimpleCell, Avatar, Link} from "@vkontakte/vkui";
import {ActivePanels, IGroup} from "../types";

interface IGroupItemProps extends IGroup {
    setActivePanel(panel: ActivePanels): void
}

const GroupItem: React.FC<IGroupItemProps> = (props) => {

    const {name, setActivePanel, friends, members_count, avatar_color, closed} = props;

    function renderSimpleCellChildren() {
        return (
            <div style={{display: "flex", justifyContent: "space-between", gap: '20px'}}>
                <p><b>{name}</b></p>
                {closed ? <p>Закрытая группа</p> : <p>Открытая группа</p>}
                {friends && <p>Друзей: {friends?.length}</p>}
                {members_count > 0 && <p>Подписчиков: {members_count}</p>}
                {friends && <p>Друзей: {<Link onClick={() => setActivePanel('friends')}>{friends?.length}</Link>}</p>}
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

export default GroupItem;