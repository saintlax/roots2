import { createContext, useContext, useState } from 'react';

export const Context = createContext(null);

const UserTypeContextProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);

  return (
    <Context.Provider value={{ userType, setUserType }}>
      {children}
    </Context.Provider>
  );
};

export default UserTypeContextProvider;
