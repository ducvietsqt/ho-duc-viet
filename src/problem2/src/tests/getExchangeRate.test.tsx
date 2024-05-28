import BigNumber from 'bignumber.js';
const data = [
  {
    currency: 'BLUR',
    date: '2023-08-29T07:10:40.000Z',
    price: 0.20811525423728813,
  },
  {currency: 'bNEO', date: '2023-08-29T07:10:50.000Z', price: 7.1282679},
  {currency: 'BUSD', date: '2023-08-29T07:10:40.000Z', price: 0.999183113},
  {
    currency: 'BUSD',
    date: '2023-08-29T07:10:40.000Z',
    price: 0.9998782611186441,
  },
  {currency: 'USD', date: '2023-08-29T07:10:30.000Z', price: 1},
];

function getExchangeRate(fromCurrency: string, toCurrency: string) {
  const fromData = data.find((item) => item.currency === fromCurrency);
  const toData = data.find((item) => item.currency === toCurrency);

  if (!fromData || !toData) {
    return null;
  }

  const fromPrice = new BigNumber(fromData.price);
  const toPrice = new BigNumber(toData.price);
  return fromPrice.dividedBy(toPrice);
}

test('getExchangeRate should return correct exchange rate', () => {
  const rate = getExchangeRate('BLUR', 'USD');
  expect(rate?.toNumber()).toBeCloseTo(0.20811525423728813);
});

test('getExchangeRate should return null if fromCurrency is not found', () => {
  const rate = getExchangeRate('UNKNOWN', 'USD');
  expect(rate).toBeNull();
});

test('getExchangeRate should return null if toCurrency is not found', () => {
  const rate = getExchangeRate('USD', 'UNKNOWN');
  expect(rate).toBeNull();
});

test('getExchangeRate should return 1 if fromCurrency and toCurrency are the same', () => {
  const rate = getExchangeRate('USD', 'USD');
  expect(rate?.toNumber()).toBe(1);
});
