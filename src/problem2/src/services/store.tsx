import {Price, SwapInfo} from '../domain/price';
import {
  updateCurrencies,
  updateSwapInfo,
} from '../store/reducers/currency.reducer';
import {RootState} from '../store/store';
import {useDispatch, useSelector} from 'react-redux';

export const useStore = () => {
  const currencyState = useSelector((state: RootState) => state.currency);
  const dispatch = useDispatch();
  return {
    swapInfo: currencyState,
    updateSwapInfo: (swapInfo: Partial<SwapInfo>) =>
      dispatch(updateSwapInfo(swapInfo)),
    updateCurrencies: (currencies: Price[]) =>
      dispatch(updateCurrencies(currencies)),
  };
};
