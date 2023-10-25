import React from 'react';
import css from 'app/components/MyPageSocialBox/MyPageSocialBox.module.css';

interface MyPageSocialBoxType {
  infoType: string;
  socialImg: string;
}

const MyPageSocialBox = (props: MyPageSocialBoxType) => {
  const { infoType, socialImg } = props;

  const readyAlert = () => {
    alert('준비중인 기능입니다.');
  };

  return (
    <div className={css['social-container']}>
      <div className={css['mypage-type-box']}>
        <img src={socialImg} alt="소셜 이미지" className={css['social-img']} />
        {infoType}
      </div>
      <div className={css['mypagebox-content-box']}>
        <div className={css['mypage-content-box']}>
          <button className={css.peristalsis} onClick={readyAlert}>
            연동하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPageSocialBox;
