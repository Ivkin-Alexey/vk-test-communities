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
import {createOptions, filterGroups} from "../utils";
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
        const [disabled, setDisabled] = useState<boolean>(true);

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
            setOptions(createOptions(groups, defaultOptions));
            setDisplayedGroups(groups);
            if(groups.length > 0 ) setDisabled(false);
            else setDisabled(true);
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
                                after={<Switch onChange={handleSwitch} disabled={disabled}/>}
                            >
                                Группы только с друзьями
                            </SimpleCell>
                        </FormItem>
                        <FormItem top="Приватность">
                            <Radio name="radio" value="all" defaultChecked onChange={handleRadio} disabled={disabled}>Все группы</Radio>
                            <Radio name="radio" value="onlyOpen" onChange={handleRadio} disabled={disabled}>
                                Открытые группы
                            </Radio>
                            <Radio name="radio" value="onlyClosed" onChange={handleRadio} disabled={disabled}>
                                Закрытые группы
                            </Radio>
                        </FormItem>
                        <FormItem top="Цвет аватара группы">
                            <Select
                                value={filters.color}
                                onChange={handleSelect}
                                disabled={disabled}
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