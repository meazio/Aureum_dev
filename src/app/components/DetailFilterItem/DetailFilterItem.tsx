import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import css from 'app/components/DetailFilterItem/DetailFilterItem.module.css';

interface DetailFilterItemProps {
  label: string;
  isReset: boolean;
  setIsReset: Dispatch<SetStateAction<boolean>>;
}

const DetailFilterItem: React.FC<any> = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const { isReset, label, setIsReset, onCheckChange } = props;

  useEffect(() => {
    if (isReset) {
      setIsChecked(false);
      setIsReset(false);
    }
  }, [isReset]);

  const handleCheckboxClick = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onCheckChange(label, newCheckedState);
  };

  return (
    <label className={css.field}>
      <img
        src="/images/unchecked.png"
        alt="Unchecked"
        className={`category-checkbox-image ${isChecked === true && 'none'}`}
        onClick={handleCheckboxClick}
      />
      <img
        src="/images/checked.png"
        alt="Checked"
        className={`category-checkbox-image ${isChecked === false && 'none'}`}
        onClick={handleCheckboxClick}
      />
      {label}
    </label>
  );
};

export default DetailFilterItem;
