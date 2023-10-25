import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import css from 'app/pages/MentorDetail/MentorDetail.module.css';
import MENTOR_DETAIL_DATA from 'app/data/mentorDetailData';

const MentorDetail = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(MENTOR_DETAIL_DATA);
  }, []);
  const { authorId, authorImage, title, desc, authorName, createdAt } = data;

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{title}</h1>
          <div className={css['profile-box']}>
            <Link to={`/profile/${authorId}`}>
              <img
                className={css['author-profile-img']}
                src={authorImage}
                alt="강사 프로필 사진"
              />
            </Link>
            <div className={css['author-box']}>
              <Link className="author" to={`/profile/${authorId}`}>
                {authorName}
              </Link>
              <div className="date">{createdAt}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div className="col-xs-12">
            <div>{desc}</div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default MentorDetail;
