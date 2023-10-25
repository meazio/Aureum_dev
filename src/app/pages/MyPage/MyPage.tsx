import React from 'react';
import css from 'app/pages/MyPage/MyPage.module.css';
import MyPageBox from 'app/components/MyPageBox/MyPageBox';
import MyPageSocialBox from 'app/components/MyPageSocialBox/MyPageSocialBox';

const MyPage = () => {
  const secession = () => {
    alert('탈퇴가 완료되었습니다.');
  };

  return (
    <div className={css['mypage-container']}>
      <div className={css['mypage-top-box']}>
        <img className={css.back} src="/images/back.png" alt="뒤로가기" />
        <h1 className={css['mypage-header']}>마이페이지</h1>
      </div>
      <div className={css['mypage-sub-box']}>
        <img className={css.person} src="/images/person.png" alt="회원정보" />
        <div className={css['user-info']}>회원정보</div>
      </div>
      <MyPageBox infoType="닉네임" infoContent="MEANZ" />
      <MyPageBox infoType="이메일" infoContent="meanz.job@gmail.com" />
      <MyPageBox infoType="비밀번호" infoContent="testtest123!" />

      <div className={css['mypage-sub-box']}>
        <img className={css.person} src="/images/verified.png" alt="개인정보" />
        <div className={css['user-info']}>개인정보</div>
      </div>
      <MyPageBox infoType="이름" infoContent="김민지" />
      <MyPageBox infoType="성별" infoContent="여성" />
      <MyPageBox infoType="생년월일" infoContent="1996.5.13" />
      <MyPageBox infoType="핸드폰 번호" infoContent="+82 010-1234-1234" />
      <MyPageBox
        infoType="사는 곳"
        infoContent={['01234', '서울특별시', '시흥동']}
      />

      <div className={css['mypage-sub-box']}>
        <img className={css.person} src="/images/key.png" alt="SNS 연동" />
        <div className={css['user-info']}>SNS 연동</div>
      </div>
      <MyPageSocialBox infoType="구글" socialImg="/images/google.png" />
      <MyPageSocialBox infoType="카카오" socialImg="/images/kakao.png" />

      <div className={css['mypage-secession-box']}>
        <div className={css['secession']}>회원 탈퇴</div>
      </div>
      <ul className={css['secession-info']}>
        <li>탈퇴 후 7일간 재가입이 불가능합니다.</li>
        <li>유료 구매한 아이템은 자동 소멸되며, 환불이 불가능합니다.</li>
        <li>
          탈퇴 시 계정의 모든 정보는 삭제되며 재가입 시에도 복구 되지 않습니다.
        </li>
      </ul>
      <button className={css['secession-btn']} onClick={secession}>
        탈퇴하기
      </button>
    </div>
  );
};

export default MyPage;
