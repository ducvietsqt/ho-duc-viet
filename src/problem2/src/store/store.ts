// store.ts
import {useDispatch, useSelector} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {currencyReducer} from './reducers/currency.reducer';

const store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
