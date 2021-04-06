import React from 'react';

export function useForm({
  initialValues,
  onSubmit,
  validateSchema,
}) {
  const [values, setValues] = React.useState(initialValues);
  const [isFormDisabled, setIsFormDisabled] = React.useState(true);
  const [errors, setErrors] = React.useState({});
  const [touchedFields, setTouchedFields] = React.useState({});

  async function validateValues(currentValues) {
    try {
      await validateSchema(currentValues);
      setErrors({});
      setIsFormDisabled(false);
    } catch (err) {
      const formatedErrors = err.inner.reduce((errorObjectAcc, currentError) => {
        const fieldName = currentError.path;
        const errorMessage = currentError.message;
        return {
          ...errorObjectAcc,
          [fieldName]: errorMessage,
        };
      }, {});

      setErrors(formatedErrors);
      setIsFormDisabled(true);
    }
  }

  React.useEffect(() => {
    validateValues(values);
  }, [values]);

  return {
    values,
    handleSubmit(event) {
      event.preventDefault();
      onSubmit(values);
    },
    handleChange(event) {
      const fieldName = event.target.getAttribute('name');
      const { value } = event.target;

      setValues((currentValues) => ({
        ...currentValues,
        [fieldName]: value,
      }));
    },
    handleBlur(event) {
      const fieldName = event.target.getAttribute('name');

      setTouchedFields({
        ...touchedFields,
        [fieldName]: true,
      });
    },
    isFormDisabled,
    setIsFormDisabled,
    errors,
    touchedFields,
  };
}
