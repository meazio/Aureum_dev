import React from 'react';
import css from 'app/components/ScrollToTopButton/ScrollToTopButton.module.css';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className={css['scroll-to-top-container']} onClick={scrollToTop}>
      <img src="/images/scroll-to-top.png" alt="위로 가기" />
    </div>
  );
};

export default ScrollToTopButton;
