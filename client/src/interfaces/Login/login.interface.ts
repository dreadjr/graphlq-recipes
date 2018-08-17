interface LoginInputErrors {
  errors?: {
    [key: string]: LoginInputValues;
  };
}

interface LoginInputValues {
  email: string;
  password: string;
}

export type LoginState = LoginInputValues & LoginInputErrors;
