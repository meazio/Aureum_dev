import React from 'react';
import css from 'app/components/CategoryTag/CategoryTag.module.css';

interface CategoryTagType {
  categoryTag: string;
}

const CategoryTag = (props: CategoryTagType) => {
  const { categoryTag } = props;
  return <div className={css['category-tag']}>{categoryTag}</div>;
};

export default CategoryTag;
