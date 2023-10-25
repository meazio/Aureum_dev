import React, { useState } from 'react';
import css from 'app/components/MyPageBox/MyPageBox.module.css';

interface MyPageBoxType {
  infoType: string;
  infoContent: string | string[];
}

const MyPageBox = (props: MyPageBoxType) => {
  const { infoType, infoContent } = props;
  const isPassWord = infoType === '비밀번호';
  const isAddress = infoType === '사는 곳';
  const isNickname = infoType === '닉네임';
  const isEmail = infoType === '이메일';
  const isAddressArray = typeof infoContent === 'object';
  const [zipCode, address, detailAddress] = infoContent;

  const [isChangePW, setIsChangePW] = useState(false);
  const [isShowPW, setIsShowPW] = useState(false);

  const changePW = () => {
    setIsChangePW(!isChangePW);
  };

  const toggleShowPW = () => {
    setIsShowPW(!isShowPW);
  };

  return (
    <div
      className={`${css['mypagebox-container']} ${
        isPassWord && css['password-container']
      } ${isAddress && css['address-container']}
      }`}
    >
      <div className={css['mypage-type-box']}>
        {infoType} <span className={css.essential}>(필수)</span>
      </div>
      <div>
        <div className={css['mypage-content-box']}>
          {isAddressArray && (
            <div className={css['address-box']}>
              <div className={css['zip-code']}>{zipCode}</div>
              <div className={css['address']}>{address}</div>
              <div className={css['detail-address']}>{detailAddress}</div>
            </div>
          )}
          {isPassWord && !isChangePW && '********'}
          {isPassWord && isChangePW && (
            <>
              <input
                type={isShowPW ? 'test' : 'password'}
                className={css['change-pw']}
              />
              <img
                src={isShowPW ? '/images/green-eye.png' : '/images/eye.png'}
                alt="비밀번호 보기"
                onClick={toggleShowPW}
                className={css['show-pw']}
              />
            </>
          )}
          {!isAddressArray && !isPassWord && infoContent}
          {(isNickname || isEmail) && (
            <img src="/images/checked.png" alt="체크" className={css.checked} />
          )}
          {isPassWord && (
            <button className={css['change-btn']} onClick={changePW}>
              변경하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPageBox;
