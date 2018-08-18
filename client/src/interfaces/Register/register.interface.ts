import { RouteComponentProps } from 'react-router-dom';

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

export interface RegisterProps extends RouteComponentProps<any> {
  history: any;
  refetch: any;
}
