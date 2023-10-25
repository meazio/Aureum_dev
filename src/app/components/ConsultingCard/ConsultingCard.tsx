import React from 'react';
import 'app/components/ConsultingCard/ConsultingCard.css';
import { useLocation, useNavigate, Link } from 'react-router-dom';

interface ConsultingCardType {
  consulting: {
    id: number;
    profileImage: string;
    author: string;
    date: string;
    like: number;
    title: string;
    content: string;
    tags: string[];
  };
}

const ConsultingCard = (props: ConsultingCardType) => {
  const navigate = useNavigate();
  const { hash } = useLocation();
  const isExistTag = hash !== '';
  const tag = hash.split('tag/')[1];
  const { id, profileImage, author, date, like, title, content, tags } =
    props.consulting;
  const includeTag = tags.includes(tag);

  return (
    <div
      className={`article-preview consulting-card ${
        isExistTag && !includeTag ? 'filtered-card' : null
      }`}
      onClick={() => navigate(`/consulting/${id}`)}
    >
      <div className="article-meta">
        <img src={profileImage} />

        <div className="info">
          {author}
          <span className="date">{date}</span>
        </div>

        <button className="btn btn-sm pull-xs-right btn-outline-primary">
          <i className="ion-heart"></i>
          <span className="counter"> {like} </span>
        </button>
      </div>

      <Link className="preview-link" to="">
        <h1>{title}</h1>
        <p>{content}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {tags.map((tag, index) => (
            <li className="tag-default tag-pill tag-outline" key={index}>
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
};

export default ConsultingCard;
