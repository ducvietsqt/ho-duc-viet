export const fetcher = (url: string) => {
  return fetch(url).then((response) => {
    return response.json();
  });
};
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const URL_TOKEN_IMAGE = process.env.REACT_APP_URL_TOKEN;

export const getIconUrl = (currency: string) => {
  const icon = exclude[currency] ?? currency;
  return `${URL_TOKEN_IMAGE}/${icon}.svg`;
};

const exclude: {[key: string]: string} = {
  STOSMO: 'stOSMO',
  STATOM: 'stATOM',
  STLUNA: 'stLUNA',
  STEVMOS: 'stEVMOS',
  RATOM: 'rATOM',
};
