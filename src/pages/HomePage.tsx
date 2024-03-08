import React, {useEffect} from 'react';
import {groupsActions} from "../redux/Groups/slice";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchGroups} from "../api/api";
import {GetGroupsResponse, IGroup} from "../types";
import {
    Group,
    Panel,
    SimpleCell,
    Header, CustomSelectOption,
    PanelHeader, FormItem,
    Avatar, FormLayoutGroup,
    IconButton, Radio,
    SplitLayout, Select, Switch,
    SplitCol, View, usePlatform,
} from '@vkontakte/vkui';
import {Icon28PaletteOutline, Icon28UserOutline, Icon28SettingsOutline, Icon12Lock} from '@vkontakte/icons';
import GroupItem from "../components/GroupItem";

export const HomePage = () => {
    const platform = usePlatform();
    const groups = useAppSelector(state => state.groups.groups);

    const options = groups.map(el => {
        if(el.avatar_color) return el.avatar_color;
    })


    const dispatch = useAppDispatch();

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


    // @ts-ignore
    return (
        <>
            <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none"/>}>
                <SplitCol autoSpaced>
                    <View activePanel="main">
                        <Panel id="main">
                            <PanelHeader>Список групп</PanelHeader>
                            <Group>
                                <FormLayoutGroup>
                                    <FormItem top="Фильтры">
                                        <SimpleCell Component="label" after={<Switch defaultChecked />}>
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
                                {groups.map((el: IGroup, i) => <GroupItem {...el} key={i}/>)}
                            </Group>
                        </Panel>
                    </View>
                </SplitCol>
            </SplitLayout>
        </>
    );
};
