import React, { Dispatch, SetStateAction } from 'react';
import css from 'app/components/CategoryToggle/CategoryToggle.module.css';
import useWindowSize from 'app/hooks/useWindowSize';

interface CategoryToggleType {
  category: string;
  subCategory: string[];
  selectedCategory: string;
  setCategory: Dispatch<SetStateAction<string | null>>;
  setSubCategory: Dispatch<SetStateAction<string | null>>;
  isOpen: boolean;
  toggleCategory: () => void;
}

const CategoryToggle = (props: CategoryToggleType) => {
  const {
    category,
    subCategory,
    setCategory,
    setSubCategory,
    selectedCategory,
    isOpen,
    toggleCategory,
  } = props;

  const { width } = useWindowSize();
  const isTabletMobile = width < 1024;
  const isFoundation = category === '창업';
  const isAll = selectedCategory === 'ALL';

  return (
    <>
      <div className={css.category} onClick={() => toggleCategory()}>
        {category}
        {isOpen ? (
          <img className={css.toggle} src="/images/up.png" alt="토글" />
        ) : (
          <img
            className={css.toggle}
            src={isTabletMobile ? '/images/down.png' : '/images/right.png'}
            alt="토글"
          />
        )}
      </div>
      {isOpen && (
        <>
          {isFoundation && (
            <div
              className={`${css['all-category']} ${isAll && css['selected']}`}
              onClick={(e) => {
                setCategory(category);
                setSubCategory(e?.currentTarget?.textContent);
              }}
            >
              ALL
            </div>
          )}
          {subCategory.map((category) => {
            const isSelected = category === selectedCategory;

            return (
              <div
                key={category}
                className={`${css['sub-category']} ${
                  isSelected && css['selected']
                }`}
                onClick={(e) => {
                  setCategory(props?.category);
                  setSubCategory(e?.currentTarget?.textContent);
                }}
              >
                <img
                  src={`${
                    isSelected
                      ? '/images/toggle-icon-white.png'
                      : '/images/toggle-icon.png'
                  }`}
                  alt="카테고리 토글 아이콘"
                  className={css['toggle-icon']}
                />
                {category}
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default CategoryToggle;
