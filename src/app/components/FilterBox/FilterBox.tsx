// FilterBox 컴포넌트
import React, { Children, ReactNode, useEffect, useState } from 'react';
import css from 'app/components/FilterBox/FilterBox.module.css';

interface FilterBoxType {
  category: string;
  children: ReactNode;
}

interface DetailFilterItemProps {
  label: string;
  onCheckChange: (label: string, isChecked: boolean) => void;
}

const FilterBox = (props: FilterBoxType) => {
  const { category, children } = props;
  const [checkedCount, setCheckedCount] = useState(0);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleItemCheck = (label: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, label]);
    } else {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== label),
      );
    }
  };

  useEffect(() => {
    setCheckedCount(checkedItems.length);
  }, [checkedItems]);

  return (
    <div>
      <div className={css['filter-box-title']}>
        {category}
        <span>{checkedCount}</span>
      </div>
      <div className={css['detail-filter-box']}>
        {Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(
              child as React.ReactElement<DetailFilterItemProps>,
              {
                onCheckChange: handleItemCheck, // DetailFilterItem에서 상태 변경 이벤트를 전달
              },
            );
          }
          return child;
        })}
      </div>
    </div>
  );
};

export default FilterBox;
