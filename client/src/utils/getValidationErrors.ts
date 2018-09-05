export const catchValidationErrors = (error: any) => {
  const {
    graphQLErrors: [
      {
        extensions: { exception: errors }
      }
    ]
  } = error;

  return errors;
};
