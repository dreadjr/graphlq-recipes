import * as React from 'react';
import { Typography } from '@material-ui/core';
import {
  UserInfoProps,
  IFavorite
} from '../../interfaces/Profile/userInfo.interface';
import { Link } from 'react-router-dom';

const formatDate = (date: Date): string => {
  const newDate = new Date(date).toLocaleDateString('en-US');
  const newTime = new Date(date).toLocaleTimeString('en-US');
  return `${newDate} at ${newTime}`;
};

export default (props: UserInfoProps) => {
  const { getCurrentUser: currentUser } = props.session;

  return (
    <>
      <Typography variant="display3">User Info</Typography>
      <Typography variant="display1">
        Username: {currentUser.username}
      </Typography>
      <Typography variant="display1">Email: {currentUser.email}</Typography>
      <Typography variant="display1">
        Join Date: {formatDate(currentUser.joinDate)}
      </Typography>
      <ul style={{ textAlign: 'center' }}>
        <Typography
          variant="display3"
          style={{ paddingBottom: '1.5rem' }}
          onClick={() => console.log(currentUser)}
        >
          {currentUser.username}
          's Favorites
        </Typography>
        {currentUser.favorites.length >= 1 ? (
          currentUser.favorites.map((favorite: IFavorite) => (
            <li key={favorite._id} style={{ listStyle: 'none' }}>
              <Link to={`/recipes/${favorite._id}`}>
                <Typography variant="display3">{favorite.name}</Typography>
              </Link>
            </li>
          ))
        ) : (
          <Typography variant="display1">
            <strong>You have no favorites currently. Go add some!</strong>
          </Typography>
        )}
      </ul>
    </>
  );
};
