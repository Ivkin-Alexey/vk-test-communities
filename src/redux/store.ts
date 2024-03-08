import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export function makeStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: true,
                serializableCheck: false,
            }),
    });
}

const store = makeStore();

declare global {
    type RootState = ReturnType<typeof store.getState>;
    type AppDispatch = typeof store.dispatch;
}

export default store;
