import React from 'react';
import {HomePage} from "./pages";
import {
    AppRoot,
    SplitLayout,
    SplitCol,
    PanelHeader,
    usePlatform,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const App = () => {

    const platform = usePlatform();

    return (
        <AppRoot>
            <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none"/>}>
                <SplitCol autoSpaced>
                    <HomePage/>
                </SplitCol>
            </SplitLayout>
        </AppRoot>
    );
};

export default App;