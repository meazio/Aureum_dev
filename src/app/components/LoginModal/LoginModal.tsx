import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  ChangeEvent,
  useState,
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './LoginModal.css';
import { clearMessage } from 'app/slices/message';
import FormField from '../FormField/FormField';
import { Form, Formik } from 'formik';
import { login, socialLogin, dummyLogin } from 'app/slices/auth';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import qs from 'qs';
import { AppDispatch } from 'app/store';
import SignUpAgreeModal from 'app/components/SignUpAgreeModal/SignUpAgreeModal';

interface LoginModalProps {
  isOpen: boolean;
  setIsDummyLoggedIn: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setSavedEmail: Dispatch<SetStateAction<string>>;
  close: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, close, setEmail }) => {
  const navigate = useNavigate();

  const searchParams = useLocation().search;
  const query = qs.parse(searchParams);
  const {
    accessToken: accessTokenFromSocialLogin,
    refreshToken: refreshTokenFromSocialLogin,
  } = query;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(clearMessage());
    // if (query.accessToken) {
    //   localStorage.setItem('accessToken', accessTokenFromSocialLogin as string);
    //   localStorage.setItem(
    //     'refreshToken',
    //     refreshTokenFromSocialLogin as string,
    //   );
    //   dispatch(socialLogin(query.accessToken));
    // }
  }, [
    dispatch,
    // accessTokenFromSocialLogin,
    // refreshTokenFromSocialLogin,
    // query.accessToken,
  ]);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('이메일 형식에 맞지 않습니다.')
      .test('includes-dot', '이메일 형식에 맞지 않습니다.', function (value) {
        if (value) {
          return value.includes('.');
        }
        return false;
      })
      .required('이메일을 입력해주세요.'),
    password: Yup.string()
      .required('비밀번호를 입력해주세요.')
      .min(8, '비밀번호는 최소 8자리 이상 입력해주세요.')
      .test(
        'password',
        '비밀번호는 문자, 숫자, 특수문자를 모두 포함해야 합니다.',
        (value: string) => {
          const optionalSpeciesCount = [
            /[A-Z]/.test(value),
            /[a-z]/.test(value),
            /[\u3131-\uD79D]/.test(value),
          ].filter(Boolean).length;

          const essentialSpeciesCount = [
            /[@$!%*?&]/.test(value),
            /\d/.test(value),
          ].filter(Boolean).length;

          return optionalSpeciesCount >= 1 && essentialSpeciesCount === 2;
        },
      ),
  });

  const isObjectEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  };

  const hasEmptyString = (obj: any) => {
    return Object.values(obj).some((value) => {
      return value === '';
    });
  };

  const [saveId, setSaveId] = useState(false);

  // const [email, setEmail] = useState('');
  // const [isDummyLoggedIn, setIsDummyLoggedIn] = useState(false);

  const handleLogin = (
    formValue: { email: string; password: string },
    errors: any,
  ) => {
    const { email, password } = formValue;
    if (saveId === true) localStorage.setItem('savedEmail', email);
    else localStorage.removeItem('savedEmail');

    if (isObjectEmpty(errors) && !hasEmptyString(formValue)) {
      dispatch(dummyLogin(email));
      setEmail(email);
      close();
      // dispatch(login({ email, password }))
      //   .unwrap()
      //   .then(() => {
      //     navigate('/');
      //     close();
      //   })
      //   .catch((err: any) => alert(err?.response?.data?.message));
    }
  };

  const readyAlert = () => {
    alert('준비중입니다.');
  };

  const handleSaveId = () => {
    setSaveId(!saveId);
  };

  const savedEmail = localStorage.getItem('savedEmail') || '';

  const [isAgreeModalOpen, setIsAgreeModalOpen] = useState(false);

  const openAgreeModal = () => {
    close();
    setIsAgreeModalOpen(true);
  };

  const closeAgreeModal = () => {
    setIsAgreeModalOpen(false);
  };

  return (
    <>
      <SignUpAgreeModal isOpen={isAgreeModalOpen} close={closeAgreeModal} />
      {isOpen ? (
        <div className="modal">
          <div className="loginModal">
            <div className="modalContents">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
                {({ values, errors, touched, setFieldValue }) => (
                  <Form method="post">
                    <div className="login-container">
                      <div className="login-header">
                        <h1>로그인하기</h1>
                        <img
                          className="close-btn"
                          src="/images/close.png"
                          alt="닫기 버튼"
                          onClick={close}
                        />
                      </div>
                      <FormField
                        placeholder="아이디"
                        name="email"
                        type="text"
                        errors={errors}
                        touched={touched}
                        savedEmail={savedEmail}
                        setFieldValue={setFieldValue}
                        place="login"
                      />
                      <FormField
                        placeholder="비밀번호"
                        name="password"
                        type="password"
                        errors={errors}
                        touched={touched}
                        place="login"
                      />
                    </div>

                    <div className="loginMid">
                      <label className="saveId" htmlFor="hint">
                        <img
                          src="/images/unchecked.png"
                          alt="Unchecked"
                          className={`checkbox-image ${
                            saveId === true && 'none'
                          }`}
                          onClick={handleSaveId}
                        />
                        <img
                          src="/images/checked.png"
                          alt="Checked"
                          className={`checkbox-image ${
                            saveId === false && 'none'
                          }`}
                          onClick={handleSaveId}
                        />
                        아이디 저장
                      </label>
                      <div className="text-xs-center find">
                        <Link to="/findId" onClick={close}>
                          아이디 찾기
                        </Link>
                        <div className="middleLine">|</div>
                        <Link to="/findPw" onClick={close}>
                          비밀번호 찾기
                        </Link>
                      </div>
                    </div>

                    <div className="loginRegisterBox">
                      <button
                        onClick={() => handleLogin(values, errors)}
                        className="form-group btn btn-lg btn-primary pull-xs-right loginBtn"
                      >
                        <span>로그인하기</span>
                      </button>
                      <div className="register">
                        <Link to="" onClick={openAgreeModal}>
                          회원가입하기
                        </Link>
                      </div>
                    </div>

                    {/* <div className="socialBox">
                      <div className="socialHeader">
                        <div className="line"></div>
                        <div className="socialText">간편 SNS 로그인하기</div>
                        <div className="line"></div>
                      </div>
                      <div className="kakao" onClick={readyAlert}>
                        <img
                          className="kakaoLogo"
                          src="/images/kakao.png"
                          alt="kakao Logo"
                        />
                        <div className="kakaoText">카카오로 시작하기</div>
                      </div>
                      <div className="google" onClick={readyAlert}>
                        <img
                          className="googleLogo"
                          src="/images/google.png"
                          alt="Google Logo"
                        />
                        <div className="googleText">Sign in with Google</div>
                      </div>
                    </div> */}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LoginModal;
