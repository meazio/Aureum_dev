import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'app/components/LectureCard/LectureCard.css';
import useWindowSize from 'app/hooks/useWindowSize';

interface CardType {
  card: {
    id: number;
    category: string;
    subCategory: string;
    field: string;
    author: string;
    rateCount: number;
    image: string;
    title: string;
    content: string;
    rate: number;
    tags: string[];
  };
  disableClick?: boolean;
}

const LectureCard = (props: CardType) => {
  const { pathname } = useLocation();
  const isLecturePage = pathname === '/lecture';

  const [showAllTags, setShowAllTags] = useState(false);
  const {
    id,
    category,
    author,
    rateCount,
    image,
    title,
    content,
    rate,
    tags,
    field,
    subCategory,
  } = props.card;
  const { disableClick } = props;

  const { width } = useWindowSize();
  const isMobile = width <= 1024;

  const isMoreThanTwo = tags?.length > 3;
  const moreTagsNum = tags?.length - 3;

  return (
    <div
      className={`${isMobile && 'mobile-card'} ${
        isLecturePage && 'lecture-page-card'
      } card`}
      title={title}
    >
      <Link
        to={`/lecture/${id}`}
        className="preview-link"
        onClick={(e) => disableClick && e.preventDefault()}
      >
        <img src={image} className="card-img-top" alt="강의 샘플 이미지" />
        <div className="card-body">
          <h5 className="card-category">
            <div className="category">{subCategory}</div>
            <div className="field">{field}</div>
          </h5>
          <div className="card-title">{title}</div>
          <div className="rate-box">
            <img src="/images/rate.png" alt="평점" className="rate-img" />
            <div className="rate-text">
              {rate?.toFixed(1)}
              <span className="rate-count">({rateCount})</span>
            </div>
            <img
              src="/images/middle-line.png"
              alt="구분선"
              className="middle-line"
            />
            <div className="author-name">{author}</div>
          </div>
          {/* <p className="card-text">{content}</p> */}
        </div>
      </Link>
      <div className="tags">
        {tags?.map((tag) => (
          <div key={tag} className="lecture-tag">
            {tag}
          </div>
        ))}
        {/* {showAllTags
          ? tags.map((tag) => (
              <div key={tag} className="lecture-tag">
                {tag}
              </div>
            ))
          : tags.slice(0, 3).map((tag) => (
              <div key={tag} className="lecture-tag">
                {tag}
              </div>
            ))}
        {isMoreThanTwo && (
          <div className="more-tag-container">
            <div
              className="more-tag-btn"
              // onClick={() => setShowAllTags(!showAllTags)}
            >
              {!showAllTags && '+' + moreTagsNum}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default LectureCard;
