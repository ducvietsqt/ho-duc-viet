import {Choices} from '../Choices';
import styles from './FormSwap.module.scss';
import {InputPrice} from '../InputPrice';
import {Button} from '../Button';
import {useSwapCurrency} from '../../use-cases/swapCurrency';
import {useStore} from '../../services/store';
import {useUpdate} from 'react-use';
import {SwapInfo} from '../../domain/price';
import {ResultReceived} from '../ResultReceived';
import {useRef} from 'react';

export function FormSwap() {
  const {options, swapHandler} = useSwapCurrency();
  const {swapInfo, updateSwapInfo} = useStore();
  const update = useUpdate();
  const status = useRef<SwapInfo | null>(null);
  const updateInfo = async (value: Partial<SwapInfo>) => {
    updateSwapInfo(value);
    let newSwapInfo = {...swapInfo, ...value};
    swapHandler(newSwapInfo);
    status.current = newSwapInfo;
  };

  return (
    <form
      onSubmit={() => {
        return false;
      }}
      className={styles.form}
    >
      <h1 className={styles.title}>Fancy Form Swap</h1>
      <div className={styles.center_box}>
        <div className={styles.spacey4}>
          <div>
            <label className={styles.fontBlack}>From</label>
            <Choices
              choices={options}
              onUpdate={(item) => {
                updateInfo({fromCurrency: item.value});
              }}
            />
          </div>

          <div>
            <label className={styles.fontBlack}>Amount to send</label>
            <InputPrice
              onUpdate={(amount) => {
                console.log('INPUT_CHANGE');
                updateInfo({amount});
              }}
              value={swapInfo.amount}
              placeholder="Enter amount to send..."
              hint_rtl
            />
          </div>
        </div>
        <div className={styles.spacey4}>
          <div>
            <label className={styles.fontBlack}>To</label>
            <Choices
              choices={options}
              onUpdate={(item) => {
                updateInfo({toCurrency: item.value});
              }}
            />
          </div>
          <div>
            <label className={styles.fontBlack}>Amount to receive</label>
            <ResultReceived {...swapInfo} />
          </div>
        </div>
      </div>
      <div className={styles.button_center}>
        <Button
          title="CONFIRM SWAP"
          loading={swapInfo.isSubmitting}
          classes={styles.button_center}
          onClick={(e: any) => {
            e.preventDefault();
            updateInfo({converted: false});
            return false;
          }}
        />
      </div>
    </form>
  );
}
