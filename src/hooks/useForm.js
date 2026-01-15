import { useState, useCallback, useRef } from "react";

const useForm = (initialValues = {}) => {
  const initialFormValues = useRef(initialValues).current;
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const checkFormValidity = (currentValues, currentErrors) => {
    const hasErrors = Object.values(currentErrors).some(
      (error) => error !== ""
    );
    const hasEmptyRequiredFields =
      !currentValues.name?.trim() ||
      !currentValues.imageUrl?.trim() ||
      !currentValues.weather;

    setIsValid(!hasErrors && !hasEmptyRequiredFields);
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!value.trim()) {
        error = "Name is required";
      } else if (value.trim().length < 2) {
        error = "Name must be at least 2 characters";
      }
    }

    if (name === "imageUrl") {
      if (!value.trim()) {
        error = "Image URL is required";
      } else {
        // Basic URL validation
        try {
          new URL(value);
        } catch {
          error = "Please enter a valid URL";
        }
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    // Check overall form validity
    checkFormValidity(
      { ...values, [name]: value },
      { ...errors, [name]: error }
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }

    // Validate the field
    validateField(name, value);
  };

  const resetForm = useCallback(() => {
    setValues(initialFormValues);
    setErrors({});
    setIsValid(false);
  }, [initialFormValues]);

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
    setValues,
  };
};

export default useForm;
