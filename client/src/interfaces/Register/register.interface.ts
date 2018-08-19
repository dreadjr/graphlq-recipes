import { RouteComponentProps } from 'react-router-dom';
import { RefetchQueriesProviderFn } from 'react-apollo';

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
  refetch: RefetchQueriesProviderFn;
}

export interface RegisterData {
  token: string;
}

export interface RegisterVariables {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
