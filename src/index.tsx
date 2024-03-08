import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
import {HomePage} from './pages';
import rootReducer from './redux/rootReducer';
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({ reducer: rootReducer });

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
        <Provider store={store}>
            <React.StrictMode>
                <HomePage/>
            </React.StrictMode>
        </Provider>
);

