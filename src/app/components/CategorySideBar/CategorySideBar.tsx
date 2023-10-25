import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import css from 'app/components/CategorySideBar/CategorySideBar.module.css';
import CategoryToggle from 'app/components/CategoryToggle/CategoryToggle';
import useWindowSize from 'app/hooks/useWindowSize';
import DetailFilterItem from 'app/components/DetailFilterItem/DetailFilterItem';
import FilterBox from '../FilterBox/FilterBox';

interface CategorySideBarType {
  setCategory: Dispatch<SetStateAction<string | null>>;
  setSubCategory: Dispatch<SetStateAction<string | null>>;
  subCategory: string;
}

interface ToggleState {
  [key: string]: boolean;
}

const CategorySideBar = (props: CategorySideBarType) => {
  const { setCategory, setSubCategory, subCategory } = props;
  const { width } = useWindowSize();
  const isTabletMobile = width < 1024;

  const [isReset, setIsReset] = useState(false);
  const [resetCount, setResetCount] = useState(0);

  const [isOpen, setIsOpen] = useState<ToggleState>({
    창업: false,
    취업: false,
    취미: false,
    학습: false,
  });

  const [currentOpenToggle, setCurrentOpenToggle] = useState<string | null>(
    null,
  );

  const toggleCategory = (category: string) => {
    if (currentOpenToggle === category) {
      setIsOpen((prevState) => ({
        ...prevState,
        [category]: false,
      }));
      setCurrentOpenToggle(null);
    } else {
      setIsOpen((prevState) => ({
        ...prevState,
        [currentOpenToggle as string]: false,
        [category]: true,
      }));
      setCurrentOpenToggle(category);
    }
  };

  useEffect(() => {
    if (isReset) {
      setResetCount((prevCount) => prevCount + 1);
      setIsReset(false);
    }
  }, [isReset]);

  return (
    <div className={isTabletMobile ? css.container : css['desktop-container']}>
      <div className={css['learning-box']}>
        <img src="/images/book-green.png" alt="학습 자료" />
        <div className={css['learning-data']}>학습 자료</div>
      </div>
      <div className={css['learning-materials']}>Learning materials</div>
      <div className={css['category-box']}>
        <img src="/images/category.png" alt="카테고리" />
        <div className={css.category}>카테고리</div>
      </div>
      <div className={css.all}>전체 강의</div>
      <CategoryToggle
        category={'창업'}
        subCategory={['코파운더', '파운더']}
        selectedCategory={subCategory}
        setCategory={setCategory}
        setSubCategory={setSubCategory}
        isOpen={isOpen['창업']}
        toggleCategory={() => toggleCategory('창업')}
      />
      <CategoryToggle
        category={'취업'}
        subCategory={['개발자', '디자이너', '기획자']}
        selectedCategory={subCategory}
        setCategory={setCategory}
        setSubCategory={setSubCategory}
        isOpen={isOpen['취업']}
        toggleCategory={() => toggleCategory('취업')}
      />
      <CategoryToggle
        category={'취미'}
        subCategory={['음악', '미술', '체육']}
        selectedCategory={subCategory}
        setCategory={setCategory}
        setSubCategory={setSubCategory}
        isOpen={isOpen['취미']}
        toggleCategory={() => toggleCategory('취미')}
      />
      <CategoryToggle
        category={'학습'}
        subCategory={['초·중·고', '대학']}
        selectedCategory={subCategory}
        setCategory={setCategory}
        setSubCategory={setSubCategory}
        isOpen={isOpen['학습']}
        toggleCategory={() => toggleCategory('학습')}
      />

      <div className={css['filter-box']}>
        <div className={css['filter-box-left']}>
          <img src="/images/filter.png" alt="필터" />
          <span>필터</span>
        </div>
        <div
          className={css['filter-box-right']}
          onClick={() => setIsReset(true)}
        >
          <img src="/images/filter-reset.png" alt="필터" />
          <span>필터 해제</span>
        </div>
      </div>

      <FilterBox category="업무분류">
        <DetailFilterItem
          label="프론트엔드"
          isReset={isReset}
          setIsReset={setIsReset}
        />
        <DetailFilterItem
          label="백엔드"
          isReset={isReset}
          setIsReset={setIsReset}
        />
        <DetailFilterItem
          label="서버 클라우드"
          isReset={isReset}
          setIsReset={setIsReset}
        />
        <DetailFilterItem
          label="블록체인"
          isReset={isReset}
          setIsReset={setIsReset}
        />
      </FilterBox>

      <FilterBox category="직무분류">
        <DetailFilterItem
          label="개발 실무·이론"
          isReset={isReset}
          setIsReset={setIsReset}
        />
        <DetailFilterItem
          label="커뮤니케이션"
          isReset={isReset}
          setIsReset={setIsReset}
        />
        <DetailFilterItem
          label="재도전"
          isReset={isReset}
          setIsReset={setIsReset}
        />
      </FilterBox>

      <FilterBox category="관심분야">
        <DetailFilterItem
          label="사업화"
          isReset={isReset}
          setIsReset={setIsReset}
        />
        <DetailFilterItem
          label="기술개발(R&D)"
          isReset={isReset}
          setIsReset={setIsReset}
        />
        <DetailFilterItem
          label="시설·공간·보육"
          isReset={isReset}
          setIsReset={setIsReset}
        />
        <DetailFilterItem
          label="멘토링·컨설팅"
          isReset={isReset}
          setIsReset={setIsReset}
        />
        <DetailFilterItem
          label="글로벌"
          isReset={isReset}
          setIsReset={setIsReset}
        />
      </FilterBox>

      <button className={css['filter-btn']}>
        <img src="/images/filter-btn-icon.png" alt="필터 적용 버튼" />
        필터 적용
      </button>
    </div>
  );
};

export default CategorySideBar;
