import useSWR from 'swr';
import {Price, SwapInfo, swapCurrency} from '../domain/price';
import {fetcher, sleep} from '../libs/common';
import {useMemo} from 'react';
import {uniqBy} from 'lodash';
import {OptionType, convertPriceToOption} from '../ui/Choices';
import {useStore} from '../services/store';

export function useSwapCurrency() {
  const {swapInfo, updateSwapInfo, updateCurrencies} = useStore();
  const {data} = useSWR<Price[]>(
    `https://interview.switcheo.com/prices.json`,
    fetcher,
    {
      suspense: true,
      fallbackData: [],
      onSuccess(data, key, config) {
        updateCurrencies(data);
      },
    }
  );

  const options = useMemo<OptionType[]>(() => {
    let items = uniqBy(data ?? [], 'currency');
    return items.map(convertPriceToOption); // convertPriceToOption
  }, [data]);

  async function doSwap(swapInfo: SwapInfo) {
    const {fromCurrency, toCurrency, amount, toAmount, currencies} = swapInfo;
    console.log('AMOUNT_RECEIVED_1', {
      fromCurrency,
      toCurrency,
      amount,
      currencies,
    });
    if (fromCurrency && toCurrency && amount >= 0 && currencies) {
      const resultAmount = swapCurrency(
        fromCurrency,
        toCurrency,
        amount,
        currencies ?? []
      );
      console.log('AMOUNT_RECEIVED', resultAmount);
      if (resultAmount !== null && resultAmount > -1) {
        updateSwapInfo({toAmount: resultAmount});
      }
    }
  }

  async function swapHandler(swapInfo: SwapInfo) {
    updateSwapInfo({isSubmitting: true, converted: false});
    await sleep(500);
    doSwap(swapInfo);
    const converted =
      Boolean(swapInfo.toCurrency) && Boolean(swapInfo.fromCurrency);
    updateSwapInfo({isSubmitting: false, converted: converted});
    return false;
  }

  return {
    options,
    doSwap,
    swapHandler,
  };
}
