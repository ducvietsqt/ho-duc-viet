import React, {useCallback, useRef, useState} from 'react';
import Select, {components, OptionProps, SingleValueProps} from 'react-select';
import styles from './Choices.module.scss';
import {Price} from '../../domain/price';
import {useUpdate, useUpdateEffect} from 'react-use';
import currency from 'currency.js';
import {getIconUrl} from '../../libs/common';

export interface OptionType {
  value: string;
  label: string;
  icon: string;
  price: number;
}

type ChoiceProps = {
  choices: OptionType[];
  onUpdate?: (value: OptionType) => void;
};

export const convertPriceToOption = (price: Price): OptionType => {
  return {
    value: price.currency,
    label: `${price.currency}`,
    icon: getIconUrl(price.currency),
    price: price.price,
  };
};

const IconOption = (props: OptionProps<OptionType>) => (
  <components.Option {...props}>
    <div className={styles.item_choice}>
      <div className={styles.item_choice_icon}>
        <img
          src={props.data.icon}
          alt={props.data.label}
          style={{width: 24, height: 24, marginRight: 10}}
        />
      </div>
      <span className={styles.item_choice_label}>{props.data.label}</span>
    </div>
  </components.Option>
);

const SingleValue = (props: SingleValueProps<OptionType>) => (
  <components.SingleValue {...props}>
    <div className={styles.selected_item}>
      <img
        src={props.data.icon}
        alt={props.data.label}
        style={{width: 24, height: 24, marginRight: 10}}
      />
      <span className=" font-black text-2xl">{props.data.label}</span>
      &nbsp;
      <span className={styles.label_price}>
        ({currency(props.data.price).format()})
      </span>
    </div>
  </components.SingleValue>
);

const SuggestItems = (
  items: ChoiceProps & {onClick: (optionType: OptionType) => void}
) => (
  <div className={styles.temp_box}>
    {items.choices.slice(0, 4).map((props) => (
      <div
        className={styles.temp_item}
        key={props.value}
        onClick={() => items.onClick(props)}
      >
        <div>
          <img
            src={props.icon}
            alt={props.label}
            style={{width: 20, height: 20}}
          />
        </div>
        <div>
          <div>
            <span>{props.label}</span> &nbsp;
            <span className={styles.label_price}>
              ({currency(props.price).format()})
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const Choices: React.FC<ChoiceProps> = ({
  choices,
  onUpdate,
}: ChoiceProps) => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const tempOptions = useRef<OptionType[] | null>(null);
  const update = useUpdate();

  const handleChange = useCallback((res: any) => {
    setSelectedOption(res);
  }, []);

  useUpdateEffect(() => {
    onUpdate && selectedOption && onUpdate(selectedOption);
  }, [selectedOption]);

  return (
    <div className={styles.choice_box}>
      <Select
        value={selectedOption}
        isMulti={false}
        onChange={handleChange}
        options={choices}
        components={{Option: IconOption, SingleValue}}
        menuPosition="fixed"
        placeholder="Select currency"
        className=" outline-none"
      />
      <SuggestItems choices={choices} onClick={handleChange} />
    </div>
  );
};
