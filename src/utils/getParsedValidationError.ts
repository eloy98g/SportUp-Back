const getParsedValidationError = (errors: any) => {
  if (errors.length === 0) return "No validation errors found.";
  return JSON.stringify(errors);
};

export default getParsedValidationError