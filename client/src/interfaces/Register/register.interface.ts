import { History } from 'history';

interface RegisterInputErrors {
  errors?: {
    [key: string]: RegisterInputValues;
  };
}

interface RegisterInputValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type RegisterState = RegisterInputValues & RegisterInputErrors;

export interface RegisterProps {
  history?: History;
  refetch: any;
}
