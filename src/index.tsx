import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
import rootReducer from './redux/rootReducer';
import {configureStore} from "@reduxjs/toolkit";
import {AdaptivityProvider, AppRoot, ConfigProvider} from "@vkontakte/vkui";
import App from "./App";

const store = configureStore({reducer: rootReducer});

const root = ReactDOM.createRoot(document.getElementById('root')!);


root.render(
    <Provider store={store}>
        <ConfigProvider>
            <AdaptivityProvider>
                    <App/>
            </AdaptivityProvider>
        </ConfigProvider>
    </Provider>,
);

