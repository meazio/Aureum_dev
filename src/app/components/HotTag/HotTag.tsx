import React from 'react';
import css from 'app/components/HotTag/HotTag.module.css';

interface HotTagType {
  tag: string;
}

const HotTag = (props: HotTagType) => {
  const { tag } = props;
  return <div className={css['hot-tag']}># {tag}</div>;
};

export default HotTag;
