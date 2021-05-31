/**
 * Валидация форм
 */
import {useState} from "react";

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  function handleChange(evt) {
    const input = evt.target;
    const name = input.name;
    const value = input.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsFormValid(input.closest('form').checkValidity());
  }

  return { values, setValues, handleChange, errors, isFormValid };
}
