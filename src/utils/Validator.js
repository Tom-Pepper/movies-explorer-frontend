/**
 * Валидация полей ввода в формах
 */
import React, {useCallback, useState} from 'react';

function Validator() {
  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [regData, setRegData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isValid, setIsValid] = useState(false);

  /**
   * Функция для считывания данных с инпутов
   */
  const handleOnChange = (evt) => {
    const { name, value, validationMsg } = evt.target;
    setError({ ...error, [name]: validationMsg });
    setRegData({ ...regData, [name]: value });
    setIsValid(evt.target.closest('form').checkValidity());
  }

  /**
   * Функция сброса формы
   */
  const resetForm = useCallback(
    (clearedData = {}, clearedValidation = false) => {
      setRegData(clearedData);
      setError(clearedData);
      setIsValid(clearedValidation);
    },
    [setIsValid, setError, setRegData]
  );

  return { handleOnChange, resetForm, setIsValid, isValid, error, regData };
}

export default Validator;
