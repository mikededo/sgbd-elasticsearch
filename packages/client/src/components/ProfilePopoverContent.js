import React from 'react';

import { Button } from 'antd';

import { useAppContext } from '../util';
import SingInContent from './SingInContent';

const ProfilePopoverContent = ({ onFavouritesClick }) => {
  const { user, favourites } = useAppContext();

  const handleOnFavouritesClick = () => {
    favourites.getFavourites();
    onFavouritesClick();
  };

  const handleOnLogOut = () => {
    user.logOut();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: user.user ? '-12px -16px' : undefined,
        minWidth: '150px'
      }}
    >
      {user.user ? (
        <>
          <Button type="text" onClick={handleOnFavouritesClick}>
            Favourites
          </Button>
          <Button type="text" onClick={handleOnLogOut}>
            Log out
          </Button>
        </>
      ) : (
        <SingInContent />
      )}
    </div>
  );
};

export default ProfilePopoverContent;
