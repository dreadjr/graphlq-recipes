import * as React from 'react';
import { Typography } from '@material-ui/core';
import {
  UserInfoProps,
  IFavorite
} from '../../interfaces/Profile/userInfo.interface';
import { Link } from 'react-router-dom';

const formatDate = (date: Date) => {
  const newDate = new Date(date).toLocaleDateString('en-US');
  const newTime = new Date(date).toLocaleTimeString('en-US');
  return `${newDate} at ${newTime}`;
};

export default (props: UserInfoProps) => {
  const { getCurrentUser: currentUser } = props.session;

  return (
    <div>
      <Typography>User Info</Typography>
      <Typography>Username: {currentUser.username}</Typography>
      <Typography>Email: {currentUser.email}</Typography>
      <Typography>Join Date: {formatDate(currentUser.joinDate)}</Typography>
      <ul>
        <Typography>
          {currentUser.username}
          's Favorites
        </Typography>
        {currentUser.favorites.map((favorite: IFavorite) => (
          <li key={favorite._id} style={{ listStyle: 'none' }}>
            <Link to={`/recipes/${favorite._id}`}>
              <Typography>{favorite.name}</Typography>
            </Link>
          </li>
        ))}
        {!currentUser.favorites.length && (
          <Typography>
            <strong>You have no favorites currently. Go add some!</strong>
          </Typography>
        )}
      </ul>
    </div>
  );
};
