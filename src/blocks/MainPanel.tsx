import React, {useEffect, useState} from 'react';
import {
    Avatar,
    CustomSelectOption, CustomSelectOptionInterface,
    FormItem,
    FormLayoutGroup,
    Group,
    PanelHeader,
    Radio,
    Select,
    SimpleCell,
    Switch,
} from "@vkontakte/vkui";
import {IActivePanel, IGroup, IPrivate} from "../types";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {groupsActions} from "../redux/Groups/slice";
import {utils, filterGroups} from "../utils/utils";
import {GroupListBlock} from "./GroupListBlock";

interface IMainPanel {
    setPanel(panel: IActivePanel): void;
}

export const MainPanel = ({setPanel}: IMainPanel) => {

        const {filters, groups} = useAppSelector(state => state.groups);
        const dispatch = useAppDispatch();

        const defaultOptions: CustomSelectOptionInterface[] = [{label: "all", value: "all"}];
        const [displayedGroups, setDisplayedGroups] = useState<IGroup[]>([]);
        const [options, setOptions] = useState<CustomSelectOptionInterface[]>(defaultOptions);

        function handleSwitch(e: React.ChangeEvent<HTMLInputElement>): void {
            dispatch(groupsActions.setFilters({...filters, onlyWithFriends: Boolean(e.target.checked)}));
        }

        function handleRadio(e: React.ChangeEvent<HTMLInputElement>): void {
            const value: IPrivate = e.target.value;
            let closed: boolean | null = null;
            if (value === "onlyClosed") closed = true;
            if (value === "onlyOpen") closed = false;
            dispatch(groupsActions.setFilters({...filters, closed}));
        }

        function handleSelect(e: React.ChangeEvent<HTMLSelectElement>): void {
            const value: IPrivate = e.target.value;
            dispatch(groupsActions.setFilters({...filters, color: value}));
        }

        useEffect(() => {
            setOptions(utils(groups, defaultOptions));
            setDisplayedGroups(groups)
        }, [groups])

        useEffect(() => {
            const filteredGroups = filterGroups(groups, filters);
            setDisplayedGroups(() => filteredGroups);
        }, [filters])

        return (

            <>
                <PanelHeader>
                    Группы
                </PanelHeader>
                <Group>
                    <FormLayoutGroup>
                        <FormItem top="Группы с друзьями">
                            <SimpleCell
                                Component="label"
                                after={<Switch onChange={handleSwitch}/>}
                            >
                                Группы только с друзьями
                            </SimpleCell>
                        </FormItem>
                        <FormItem top="Приватность">
                            <Radio name="radio" value="all" defaultChecked onChange={handleRadio}>Все группы</Radio>
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
                                options={options}
                                renderOption={({option, ...restProps}) => {
                                    return (
                                        <CustomSelectOption
                                            {...restProps} key={option.value?.toString() + "1"}
                                            before={<Avatar size={24}
                                                            src={option.avatar}
                                                            style={{backgroundColor: option.value?.toString()}}
                                            />}
                                        />
                                    )
                                }}
                            />
                        </FormItem>
                    </FormLayoutGroup>
                </Group>
                <GroupListBlock setPanel={setPanel} displayedGroups={displayedGroups}/>
            </>
        )
    }
;