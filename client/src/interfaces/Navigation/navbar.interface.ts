import { RouteComponentProps } from 'react-router-dom';

export interface NavBarProps extends RouteComponentProps<any> {
  session?: {
    getCurrentUser: any;
  };
}
