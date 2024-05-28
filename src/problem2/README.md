# Fancy Form Test

A React project built with Create React App, styled using Tailwind, leveraging Service Workers for caching, and utilizing ESLint and Prettier for code standards. This project also employs Redux and Redux Toolkit for state management.

## Author

Ho Duc Viet - [GitHub Profile](https://github.com/ducvietsqt)

## Project Overview

- **Framework**: React (Create React App)
- **Styling**: Tailwind CSS
- **Caching**: Service Worker & Google workbox
- **Code Standards**: ESLint and Prettier
- **State Management**: Redux and Redux Toolkit

## Prerequisites

1. **Node Version**: Ensure you are using the correct Node version specified in the `.nvm` file.
    ```bash
    nvm install
    nvm use
    ```
2. **Check Node Version**:
    ```bash
    npm run check-node-version
    ```
3. **Environment Variables**: Configure the environment variables in the `.env` files. Example for production:
    ```plaintext
    .env.production
    REACT_APP_URL_TOKEN=https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens
    ```

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
npm install
```
## Running the Project
Start the development server:
```bash
npm run start
```
Start the production server:
```bash
npm run start:prod
```
Start the staging server:
```bash
npm run start:stag
```
## Building the Project
Build for production:
```bash
npm run build
```
Build for production (specific environment):
```bash
npm run build:prod
npm run build:stag
```
##  Eslint rules 
Run linter:
```bash
npm run lint && npm run lint:fix
```
## Formatting
```bash
npm run format
```
## Structure Architecture
### `use-cases`
Contains custom hooks that encapsulate business logic for specific features.
Example:
```bash
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
  // ...
}
```
The `useSwapCurrency` hook handles currency swap logic.
### `ui`

Contains UI components that interact with the hooks from `use-cases`.

### `tests`

Contains unit tests for the application.

### `services`

Defines services needed for the application.

### `store`

Implements Redux store with state management.

Example:
```bash
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
```
### `domain`

Defines the main entities of the project.
## Service Worker

The project integrates a Service Worker to cache some resources and enable offline capabilities. It is built using Google Workbox for optimization. See `sw.js` for details.

## License

This project is licensed under the MIT License - see the LICENSE file for details.


