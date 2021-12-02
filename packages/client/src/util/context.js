import React, { createContext, useContext, useState } from 'react';

import { playersApi, userApi } from './axios';

const Ctx = createContext();
Ctx.displayName = 'Application Context';

const useAppContext = () => {
  const context = useContext(Ctx);

  if (!context) {
    throw new Error('useAppContext called from a non AppContext childr');
  }

  return context;
};

const loadContext = () => {
  const [userLoading, setUserLoading] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const [token, setToken] = useState(null);

  const [user, setUser] = useState(null);
  const [fav, setFavs] = useState([]);
  const [players, setPlayers] = useState([]);
  const [totalPlayers, setTotalPlayers] = useState(0);

  const favouritesHelper = (id, userToken) =>
    userApi.get(`${id}/fav-players`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });

  /**
   * @param {string} email
   * @param {string} password
   */
  const login = (email, password) => {
    setUserLoading(true);

    userApi
      .post('/login', { email, password })
      .then(({ data: loginData }) => {
        setUser(loginData.user);
        setToken(loginData.token);

        setFavLoading(true);
        favouritesHelper(loginData.user.id, loginData.token).then(
          ({ data: favsData }) => {
            setFavs(favsData);
            setFavLoading(false);
          }
        );

        setUserLoading(false);
      })
      .catch(() => {
        console.error('error on login');
        setUserLoading(false);
      });
  };

  const register = (name, lastName, email, password) => {
    setUserLoading(true);

    userApi
      .post('/register', { name, lastName, email, password })
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        setUserLoading(false);
      })
      .catch(() => {
        console.error('error on register');
        setUserLoading(false);
      });
  };

  const getFavourites = () => {
    if (!user) {
      return;
    }

    setFavLoading(true);

    favouritesHelper(user.id, token)
      .then(({ data }) => {
        setFavs(data);
        setFavLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setFavLoading(false);
      });
  };

  const toggleFavourite = (player, isFavourite = false) => {
    if (!user) {
      return;
    }

    setFavLoading(true);
    if (isFavourite) {
      // Api call to remove favourite
      userApi
        .delete(`/${user.id}/fav-players/${player.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
          // Remove from favourite
          const iof = fav.findIndex(({ id }) => player.id === id);

          setFavs((prev) => {
            prev.splice(iof, 1);
            return [...prev];
          });
          setFavLoading(false);
        })
        .catch(() => {
          setFavLoading(false);
        });
    } else {
      // Api call to add favourite
      userApi
        .post(
          `/${user.id}/fav-players/${player.id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          // Add to favourite
          setFavs((prev) => [...prev, player]);
          setFavLoading(false);
        })
        .catch(() => {
          setFavLoading(false);
        });
    }
  };

  const getPlayers = (from, limit, count = false) => {
    setSearchLoading(true);

    return playersApi
      .get('', { params: { from, limit, count } })
      .then(({ data }) => {
        setPlayers(data.players);

        if (count) {
          setTotalPlayers(data.total);
        }

        setSearchLoading(false);

        return data?.total;
      });
  };

  return {
    user: {
      user,
      loading: userLoading,
      login,
      register,
      logOut: () => setUser(null)
    },
    favourites: {
      players: fav,
      loading: favLoading,
      getFavourites,
      toggleFavourite
    },
    search: {
      loading: searchLoading,
      result: players,
      total: totalPlayers,
      get: getPlayers
    }
  };
};

const AppContext = ({ children }) => {
  const context = loadContext();

  return <Ctx.Provider value={context}>{children}</Ctx.Provider>;
};

export default AppContext;
export { useAppContext };
