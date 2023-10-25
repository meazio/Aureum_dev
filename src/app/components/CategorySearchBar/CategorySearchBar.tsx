import React, { Dispatch, SetStateAction, useEffect } from 'react';
import css from 'app/components/CategorySearchBar/CategorySearchBar.module.css';
import CATEGORY_DATA from 'app/data/categoryData';

interface CategorySearchBarType {
  category: string;
  subCategory: string;
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string | null>>;
  setSearch: Dispatch<SetStateAction<boolean>>;
}

const CategorySearchBar = (props: CategorySearchBarType) => {
  const { category, subCategory, searchKeyword, setSearchKeyword, setSearch } =
    props;

  const filterData = () => {
    if (
      subCategory === 'ALL' ||
      subCategory === '코파운더' ||
      subCategory === '파운더'
    ) {
      return CATEGORY_DATA.filter((data) => data.category === 'foundation');
    } else if (subCategory === '개발자') {
      return CATEGORY_DATA.filter((data) => data.category === 'developer');
    }
    return [];
  };

  const handleSearchKeyword = (e: {
    target: { value: React.SetStateAction<string | null> };
  }) => {
    setSearchKeyword(e.target.value);
  };

  useEffect(() => {
    filterData();
  }, [subCategory]);

  const filteredSmallCategory = filterData()[0]?.smallCategory;
  const filteredSubCategory = filterData()[0]?.subCategory;

  return (
    <div className={css['menubar-container']}>
      <div className={css.header}>
        <span className={css.all}>{category}</span>
        <span className={css.divider}>/</span>
        <span className={css.category}>{subCategory}</span>
      </div>
      {/* <div className={css['top-menu-bar']}>
        <div className={css.step}>창업단계</div>
        <select className={css['step-select']}>
          <option value="select">선택해주세요</option>
          {filteredSubCategory?.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
        <div className={css.interests}>관심분야</div>
        <select className={css['interests-select']}>
          <option value="select">선택해주세요</option>
          {filteredSmallCategory?.map((small) => (
            <option key={small} value={small}>
              {small}
            </option>
          ))}
        </select>
        <button className={css.search}>검색하기</button>
      </div> */}
      <div className={css['search-wrapper']}>
        <input
          value={searchKeyword}
          onChange={handleSearchKeyword}
          className={css['search-input']}
          placeholder="검색어를 입력하세요."
        />
        <img
          onClick={() => setSearch(true)}
          className={css['search-icon']}
          src="/images/search-green.png"
          alt="검색"
        />
      </div>

      {/* <div className={css['category-tags']}>
        {data.map((tag) => (
          <CategoryTag key={tag.id} categoryTag={tag.categoryTag} />
        ))}
      </div> */}
    </div>
  );
};

export default CategorySearchBar;
