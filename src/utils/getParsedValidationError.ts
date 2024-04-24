const getParsedValidationError = (errors: any) => {
  if (errors.length === 0) return "No validation errors found.";
  return errors[0].message;
};

export default getParsedValidationError