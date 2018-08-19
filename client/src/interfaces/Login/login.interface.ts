import { RouteComponentProps } from 'react-router-dom';
import { RefetchQueriesProviderFn } from 'react-apollo';

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

export interface LoginProps extends RouteComponentProps<any> {
  refetch: RefetchQueriesProviderFn;
}

export interface LoginData {
  token: string;
}

export interface LoginVariables {
  email: string;
  password: string;
}
