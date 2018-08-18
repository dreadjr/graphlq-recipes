import { History } from 'history';
import { RouteComponentProps } from 'react-router-dom';

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
  history: History;
  refetch: any;
}
