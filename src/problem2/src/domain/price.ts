import BigNumber from 'bignumber.js';

export type Price = {
  currency: Currency;
  date: DateTimeString;
  price: PriceCents;
  uuid: pk;
};

export type SwapInfo = {
  fromCurrency: Currency;
  toCurrency: Currency;
  amount: number;
  toAmount: number;
  currencies: Price[];
  isSubmitting: boolean;
  converted: boolean;
};

function getPriceByCurrencies(
  currency: Currency,
  data: Price[]
): BigNumber | null {
  const currencyData = data.find((item) => item.currency === currency);
  return currencyData ? new BigNumber(currencyData.price) : null;
}

export function swapCurrency(
  fromCurrency: Currency,
  toCurrency: Currency,
  amount: number,
  data: Price[]
): number | null {
  const fromPrice = getPriceByCurrencies(fromCurrency, data);
  const toPrice = getPriceByCurrencies(toCurrency, data);
  if (fromPrice === null || toPrice === null) {
    return null;
  }
  const amountBN = new BigNumber(amount);
  const toAmount = amountBN.multipliedBy(fromPrice).dividedBy(toPrice);
  return toAmount.toNumber();
}
