import React, {useEffect, useState} from 'react';
import {groupsActions} from "../redux/Groups/slice";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchGroups} from "../api/api";
import {ActivePanels, GetGroupsResponse, IGroup} from "../types";
import {
    Group, List,
    Panel,
    SimpleCell,
    Header, PanelHeaderBack,
    PanelHeader, FormItem,
    Avatar, FormLayoutGroup,
    Cell, Radio,
    SplitLayout, Select, Switch,
    SplitCol, View, usePlatform,
} from '@vkontakte/vkui';
import GroupItem from "../components/GroupItem";

export const HomePage = () => {
    const {groups} = useAppSelector(state => state.groups);
    const {selectedGroup} = useAppSelector(state => state.groups);

    const options = groups.map(el => {
        if (el.avatar_color) return el.avatar_color;
    })

    const dispatch = useAppDispatch();

    const [activePanel, setActivePanel] = useState<ActivePanels>('main');
    const [filters, setFilters] = useState([]);

    function getGroups() {
        try {
            fetchGroups().then(response => {
                if (response.result === 1 && response.data) dispatch(groupsActions.setGroups(response.data));
                else return new Error("Ошибка сервера");
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

    function renderMainPanel() {
        return (<Panel id="main">
            <PanelHeader>Группы</PanelHeader>
            <Group>
                <FormLayoutGroup>
                    <FormItem top="Фильтры">
                        <SimpleCell Component="label" after={<Switch defaultChecked/>}>
                            С друзьями
                        </SimpleCell>
                        <Radio name="radio" value="1" defaultChecked>
                            Все группы
                        </Radio>
                        <Radio name="radio" value="2">
                            Открытые группы
                        </Radio>
                        <Radio name="radio" value="3">
                            Закрытые группы
                        </Radio>
                    </FormItem>
                </FormLayoutGroup>
                {/*<FormItem*/}
                {/*    top="Администратор"*/}
                {/*    htmlFor="select-id"*/}
                {/*    bottom="Пример использования Select для выбора администратора из списка"*/}
                {/*>*/}
                {/*    <Select*/}
                {/*        id="select-id"*/}
                {/*        placeholder="Не выбран"*/}
                {/*        options={options}*/}
                {/*        renderOption={({ option, ...restProps }) => (*/}
                {/*            <CustomSelectOption*/}
                {/*                {...restProps}*/}
                {/*                key={option.value}*/}
                {/*                before={<Avatar size={24} src={option.avatar} />}*/}
                {/*            />*/}
                {/*        )}*/}
                {/*    />*/}
                {/*</FormItem>*/}
            </Group>

            <Group header={<Header mode="secondary">Группы</Header>}>
                {groups.map((el: IGroup, i) => <GroupItem {...el} setActivePanel={setActivePanel} key={i}/>)}
            </Group>
        </Panel>)
    }

    function renderFriendsPanel() {
        return (
            <Panel id="friends">
                <PanelHeader before={<PanelHeaderBack onClick={() => setActivePanel('main')}/>}>
                    Друзья в группе "{selectedGroup?.name}"
                </PanelHeader>
                <List>
                    {selectedGroup?.friends.map(item => {
                        const {first_name, last_name} = item;

                        return <Cell key={first_name} before={<Avatar/>}>
                            {first_name + " " + last_name}
                        </Cell>
                    })}
                </List>
            </Panel>)
    }

    return (
        <View activePanel={activePanel}>
            {renderMainPanel()}
            {renderFriendsPanel()}
        </View>
    );
};
