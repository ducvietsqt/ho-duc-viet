// reducers.ts
import {createAction, createReducer} from '@reduxjs/toolkit';
import {Price, SwapInfo} from '../../domain/price';

const initialState: SwapInfo = {
  fromCurrency: '',
  toCurrency: '',
  amount: 0,
  toAmount: 0,
  currencies: [],
  isSubmitting: false,
  converted: false,
};

export const updateSwapInfo = createAction<Partial<SwapInfo>, 'updateSwapInfo'>(
  'updateSwapInfo'
);
export const updateCurrencies = createAction<Price[], 'updateCurrencies'>(
  'updateCurrencies'
);

export const currencyReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(updateSwapInfo, (state, action) => {
      Object.assign(state, action.payload);
    })
    .addCase(updateCurrencies, (state, action) => {
      if (action.payload) {
        state.currencies = action.payload;
      }
    })
);
