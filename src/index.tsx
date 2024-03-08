import React from 'react';
import ReactDOM, {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux'
import {App} from './App';
import rootReducer from './redux/rootReducer';
import {configureStore} from "@reduxjs/toolkit";
import {AdaptivityProvider, ConfigProvider} from "@vkontakte/vkui";

const store = configureStore({ reducer: rootReducer });

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <Provider store={store}>
    <ConfigProvider >
        <AdaptivityProvider>
            <App />
        </AdaptivityProvider>
    </ConfigProvider>
    </Provider>,
);

