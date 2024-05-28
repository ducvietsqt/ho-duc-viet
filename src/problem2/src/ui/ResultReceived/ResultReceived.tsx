import {SwapInfo} from '../../domain/price';
import {getIconUrl} from '../../libs/common';
import styles from './ResultReceived.module.scss';
import classNames from 'classnames';

export function ResultReceived(props: SwapInfo) {
  return (
    <div className={styles.container}>
      <div
        className={classNames(
          `space-y-2 ${props.converted ? styles.showbox : styles.hidebox}`
        )}
      >
        <div className={styles.center2}>
          <span className={styles.fontblack}>{props.amount}</span>
          <div className={styles.center1}>
            <img src={getIconUrl(props.fromCurrency)} alt="" />
            {props.fromCurrency}
          </div>
          =
        </div>
        <div className={styles.center1}>
          <span className={styles.fontblack}>{props.toAmount}</span>
          <img
            src={getIconUrl(props.toCurrency)}
            width={20}
            height={20}
            alt=""
          />
          {props.toCurrency}
        </div>
      </div>
    </div>
  );
}
