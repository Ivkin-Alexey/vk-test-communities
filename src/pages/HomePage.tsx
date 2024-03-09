import React, {useEffect, useState} from 'react';
import {groupsActions} from "../redux/Groups/slice";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchGroups} from "../api/api";
import {ActivePanels, Filters, IGroup, IPrivate, User} from "../types";
import {
    Group, List,
    Panel, Spinner,
    SimpleCell,
    Header, PanelHeaderBack,
    PanelHeader, FormItem,
    Avatar, FormLayoutGroup,
    Cell, Radio, Switch,
    View, Select, CustomSelectOption, CustomSelectOptionInterface
} from '@vkontakte/vkui';
import {GroupItem} from "../components";

export const HomePage = () => {
    const { groups, selectedGroup } = useAppSelector(state => state.groups);
    const dispatch = useAppDispatch();

    const defaultFilters: Filters = {color: "all", closed: null, onlyWithFriends: false};
    const defaultOptions: CustomSelectOptionInterface[] = [{label: "all", value: "all"}];

    const [activePanel, setActivePanel] = useState<ActivePanels>('main');
    const [displayedGroups, setDisplayedGroups] = useState<IGroup[]>([]);
    const [options, setOptions] = useState<CustomSelectOptionInterface[]>([]);
    const [filters, setFilters] = useState<Filters>(defaultFilters);

    function getGroups(): void {
        try {
            fetchGroups().then(response => {
                if (response.result === 1 && response.data) {
                    dispatch(groupsActions.setGroups(response.data));
                    setDisplayedGroups(response.data);
                    setOptions(createOptions(response.data));
                } else throw new Error("Ошибка сервера");
            })
        } catch (e) {
            console.log(e);
        }
    }

    function createOptions(arr: IGroup[]): CustomSelectOptionInterface[] {
        const newArr: string[] = [];
        arr.forEach((el: IGroup) => {
            if (el.avatar_color) newArr.push(el.avatar_color);
            else newArr.push("without color");
        });
        let result: string[] | CustomSelectOptionInterface[] = [...new Set(newArr)];
        result = result.map((el: string) => ({label: el, value: el}));
        result.unshift(defaultOptions[0]);
        return result;
    }

    function handleSwitch(e: React.ChangeEvent<HTMLInputElement>): void {
        setFilters((prev: Filters) => ({...prev, onlyWithFriends: Boolean(e.target.checked)}))
    }

    function handleRadio(e: React.ChangeEvent<HTMLInputElement>): void {
        const value: IPrivate = e.target.value;
        let closed: boolean | null = null;
        if (value === "onlyClosed") closed = true;
        if (value === "onlyOpen") closed = false;
        setFilters(prev => ({...prev, closed}));
    }

    function handleSelect(e: React.ChangeEvent<HTMLSelectElement>): void {
        const value: IPrivate = e.target.value;
        setFilters((prev: Filters) => ({...prev, color: value}));
    }

    useEffect(() => {
        setTimeout(() => getGroups(), 1000);
    }, [])

    useEffect(() => {
        const {onlyWithFriends, closed, color} = filters;
        let arr: IGroup[] = [...groups];
        if (onlyWithFriends) arr = arr.filter(el => el.friends);
        if (closed) arr = arr.filter(el => el.closed);
        if (closed === false) arr = arr.filter(el => !el.closed);
        if (color !== "all") {
            if (color === "without color") arr = arr.filter(el => !el.avatar_color);
            else arr = arr.filter(el => el.avatar_color === filters.color);
        }
        setDisplayedGroups(() => arr);
    }, [filters])

    function renderMainPanel() {

        return (
            <Panel id="main">
                <PanelHeader>Группы</PanelHeader>
                <Group>
                    <FormLayoutGroup>
                        <FormItem top="Группы с друзьями">
                            <SimpleCell
                                Component="label"
                                after={<Switch onChange={e => handleSwitch(e)}/>}
                            >
                                Группы только с друзьями
                            </SimpleCell>
                        </FormItem>
                        <FormItem top="Приватность">
                            <Radio name="radio" value="all" defaultChecked onChange={handleRadio}>
                                Все группы
                            </Radio>
                            <Radio name="radio" value="onlyOpen" onChange={handleRadio}>
                                Открытые группы
                            </Radio>
                            <Radio name="radio" value="onlyClosed" onChange={handleRadio}>
                                Закрытые группы
                            </Radio>
                        </FormItem>
                        <FormItem top="Цвет аватара группы">
                            <Select
                                value={filters.color}
                                onChange={handleSelect}
                                options={options.length > 0 ? options : defaultOptions}
                                renderOption={({option, ...restProps}) => {
                                    return (
                                        <CustomSelectOption
                                            {...restProps} key={option.value?.toString() + "1"}
                                            before={<Avatar size={24} src={option.avatar}
                                                            style={{backgroundColor: option.value?.toString()}}/>}
                                        />
                                    )
                                }}
                            />
                        </FormItem>
                    </FormLayoutGroup>
                </Group>
                <Group header={<Header mode="secondary">Группы</Header>}>
                    {displayedGroups.length > 0 ?
                        renderGroupList() :
                        groups.length > 0 ? <p>Выбранные группы отсутствуют</p> :
                            <Spinner size="large" style={{margin: '20px 0'}}/>
                    }
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
                    {selectedGroup?.friends.map((item: User) => {
                        const {first_name, last_name} = item;

                        return <Cell key={first_name} before={<Avatar/>}>
                            {first_name + " " + last_name}
                        </Cell>
                    })}
                </List>
            </Panel>)
    }

    function renderGroupList() {
        return displayedGroups.map((el: IGroup, i: number) => {
            return <GroupItem {...el} setActivePanel={setActivePanel} key={i}/>
        })
    }

    return (
        <View activePanel={activePanel}>
            {renderMainPanel()}
            {renderFriendsPanel()}
        </View>
    );
};
