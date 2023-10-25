import React, { useEffect, useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import 'app/components/FormField/FormField.css';

type SetFieldValue = (
  field: string,
  value: any,
  shouldValidate?: boolean,
) => void;

interface FormFieldType {
  label?: string;
  placeholder: string;
  name: string;
  type: string;
  errors: any;
  touched: any;
  disabled?: boolean;
  as?: string;
  value?: string;
  savedEmail?: string;
  setFieldValue?: SetFieldValue;
  values?: any;
  place?: string;
}

const FormField = (props: FormFieldType) => {
  const {
    label,
    placeholder,
    name,
    type,
    errors,
    touched,
    disabled,
    as,
    value,
    setFieldValue,
    values,
    place,
  } = props;
  const isInvalid = errors[name] && touched[name];
  const hasValue = value && value.trim().length > 0;

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const savedId = localStorage.getItem('savedEmail');

  useEffect(() => {
    if (setFieldValue && savedId) {
      setFieldValue('email', savedId);
    }
  }, []);

  const checkPasswordConditions = (password: string) => {
    const conditions = [
      /[A-Za-z\u3131-\uD79D]/.test(password),
      /\d/.test(password),
      /[@$!%*?&]/.test(password),
    ];

    return conditions;
  };

  const [isShowPassword, setIsShowPassowrd] = useState(false);
  const [isShowPasswordCheck, setIsShowPassowrdCheck] = useState(false);

  const conditionResults = checkPasswordConditions(values?.password);

  const toggleShowPW = () => {
    if (name === 'password') {
      setIsShowPassowrd(!isShowPassword);
    } else if (name === 'passwordCheck') {
      setIsShowPassowrdCheck(!isShowPasswordCheck);
    }
  };

  const isLogin = place === 'login';
  const isEmail = name === 'email';
  const isNickname = name === 'nickname';
  const isDetailAddress = name === 'detailAddress';
  const isPhoneNumber = name === 'phoneNumber';
  const isGuardianPhoneNumber = name === 'guardianPhoneNumber';
  const isAddress = name === 'address';
  const isPWCheck = name === 'passwordCheck';
  const isZipCode = name === 'zipCode';
  const isCountry = name === 'country';
  const isAddressForm = isAddress || isZipCode || isCountry || isDetailAddress;
  const isGuardian = place === 'guardian';
  const isNormal = !isLogin && !isGuardian;

  return (
    <>
      <div
        className={`form-container ${isLogin && 'login-form-container'} ${
          isGuardian && 'guardian-form-container'
        } ${isNormal && 'register-form-container'} ${isEmail ? 'email' : ''} ${
          isNickname && 'nickname'
        } ${isPhoneNumber && 'phone-number'} ${isPWCheck && 'password-check'} ${
          isAddressForm && 'address-form'
        }`}
      >
        {isLogin ? null : (
          <label htmlFor={name} className="label">
            {label}
            {!isDetailAddress && !isAddress && !isZipCode ? (
              <span className="essential"> (필수)</span>
            ) : null}
          </label>
        )}

        {hasValue === undefined ? (
          <>
            {isPhoneNumber && (
              <select
                name="phoneCountryCode"
                className={
                  'form-group form-control form-control-lg phone-number-select'
                }
              >
                <option value="82">+82</option>
                <option value="1">+1</option>
              </select>
            )}
            {isGuardianPhoneNumber && (
              <select
                name="phoneCountryCode"
                className={'form-group form-control form-control-lg select'}
              >
                <option value="82">+82</option>
                <option value="1">+1</option>
              </select>
            )}
            {/* {isAddress ? (
              <Field
                name={'country'}
                as={'select'}
                onKeyPress={handleKeyUp}
                className={'form-group form-control form-control-lg country'}
              >
                <option value="대한민국">대한민국</option>
                <option value="가나">가나</option>
                <option value="미국">미국</option>
                <option value="프랑스">프랑스</option>
                <option value="스페인">스페인</option>
              </Field>
            ) : null} */}
            {/* {isAddress ? (
              <Field
                placeholder={'우편 번호를 입력해주세요'}
                name={'zip-code'}
                onKeyPress={handleKeyUp}
                className={'form-group form-control form-control-lg zip-code'}
              />
            ) : null} */}

            {isCountry ? (
              <Field
                as="select"
                name="country"
                className={
                  'form-group form-control form-control-lg' +
                  (isInvalid ? ' is-invalid' : '') +
                  (!isLogin && isEmail ? ' email-input' : '') +
                  (isNickname ? ' nickname-input' : '') +
                  (isPhoneNumber ? ' phone-number-input' : '') +
                  (isCountry ? ' countries' : '')
                }
              >
                <option value="">국적을 선택해주세요</option>
                <option value="korea">한국</option>
                <option value="japan">일본</option>
                <option value="china">중국</option>
              </Field>
            ) : (
              <Field
                placeholder={placeholder}
                name={name}
                type={isShowPassword || isShowPasswordCheck ? 'text' : type}
                disabled={disabled}
                as={as}
                onKeyPress={handleKeyUp}
                className={
                  'form-group form-control form-control-lg' +
                  (isInvalid ? ' is-invalid' : '') +
                  (!isLogin && isEmail ? ' email-input' : '') +
                  (isNickname ? ' nickname-input' : '') +
                  (isZipCode ? ' zip-code' : '') +
                  (!isLogin ? ' register-form-control' : '') +
                  (isPhoneNumber ? ' phone-number-input' : '')
                }
              />
            )}

            {/* {isAddress ? (
              <Field
                placeholder={'상세 주소를 입력해주세요'}
                name={'detailAddress'}
                onKeyPress={handleKeyUp}
                className={
                  'form-group form-control form-control-lg detail-address-input'
                }
              />
            ) : null} */}

            {name === 'password' && (
              <img
                src={
                  isShowPassword ? '/images/green-eye.png' : '/images/eye.png'
                }
                alt="비밀번호 보기"
                onClick={toggleShowPW}
                className={isLogin ? 'show-pw' : 'register-show-pw'}
              />
            )}
            {name === 'passwordCheck' && (
              <img
                src={
                  isShowPasswordCheck
                    ? '/images/green-eye.png'
                    : '/images/eye.png'
                }
                alt="비밀번호 보기"
                onClick={toggleShowPW}
                className={isLogin ? 'show-pw' : 'register-show-pw'}
              />
            )}
          </>
        ) : (
          <Field
            placeholder={placeholder}
            name={name}
            type={type}
            disabled={disabled}
            as={as}
            onKeyPress={handleKeyUp}
            value={value}
            className={
              'form-group form-control form-control-lg' +
              (!hasValue && isInvalid ? ' is-invalid' : '')
            }
          />
        )}
        {!hasValue && (
          <ErrorMessage
            name={name}
            component="div"
            className={`${
              isLogin
                ? 'login-invalid-feedback'
                : `${
                    isAddressForm
                      ? 'address-invalid-feedback'
                      : 'register-invalid-feedback'
                  }`
            } ${isGuardian && 'guardian-invalid-feedback'}`}
          />
        )}
      </div>
      {/* {name === 'password' && place !== 'login' && (
        <ul className="password-check">
          <li
            className={
              conditionResults[0] ? 'condition-met' : 'condition-not-met'
            }
          >
            문자 포함
          </li>

          <li
            className={
              conditionResults[1] ? 'condition-met' : 'condition-not-met'
            }
          >
            숫자 포함
          </li>
          <li
            className={
              conditionResults[2] ? 'condition-met' : 'condition-not-met'
            }
          >
            특수 문자 포함
          </li>
        </ul>
      )} */}
    </>
  );
};

export default FormField;
