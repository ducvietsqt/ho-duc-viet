import currency from 'currency.js';
import {ChangeEvent, useCallback, useRef, useState} from 'react';
import {useMount, useUpdateEffect} from 'react-use';
import styles from './InputPrice.module.scss';
import {debounce} from 'lodash';

type InputProps = {
  placeholder: string;
  value: number;
  hint_rtl: boolean;
  onUpdate: (value: number) => void;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
};

export function InputPrice(props: Partial<InputProps>) {
  const [price, setPrice] = useState<string>('0');
  const elm = useRef<HTMLElement>(null);
  useMount(() => {
    if (elm.current) {
      elm.current.innerHTML = currency(price).format();
    }
    setPrice(props.value?.toString() ?? '');
  });
  const onChange = useCallback((res: ChangeEvent<HTMLInputElement>) => {
    setPrice(res.target.value);
    props.onChange && props.onChange(res);
  }, []);
  useUpdateEffect(() => {
    const _price = currency(price);
    if (elm.current) {
      elm.current.innerHTML = _price.format();
    }
    if (props.onUpdate) {
      props.onUpdate(_price.value);
    }

    return () => {
      // do something
    };
  }, [price]); // you can include deps array if necessary

  useUpdateEffect(() => {
    setPrice(props.value?.toString() ?? '');
  }, [props.value]);

  return (
    <>
      <div className={styles.space}>
        <div className={styles.relative_box}>
          <input
            onChange={onChange}
            value={price}
            placeholder={props.placeholder}
            className={styles.input}
          />
          {!!price && (
            <span onClick={() => setPrice('')} className={styles.clear_icon}>
              <IconClose />
            </span>
          )}
        </div>
        {/* <div>
          <span
            className={`${styles.hint_price} ${props.hint_rtl && styles.hint_price_rtl}`}
            ref={elm}
          ></span>
        </div> */}
      </div>
    </>
  );
}

export function IconClose() {
  return (
    <svg
      className=" w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
