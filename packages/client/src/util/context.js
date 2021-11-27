import React, { createContext, useContext, useState } from 'react';

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
  const [user] = useState({
    firstName: 'Miquel',
    lastName: 'de Domingo'
  });

  return {
    user: {
      ...user,
      login: null,
      register: null
    },
    search: null
  };
};

const AppContext = ({ children }) => {
  const context = loadContext();

  return <Ctx.Provider value={context}>{children}</Ctx.Provider>;
};

export default AppContext;
export { useAppContext };
