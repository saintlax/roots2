import { createContext, useState } from 'react';

export const Context = createContext(null);

const UserTypeContextProvider = ({ children }) => {
  const [userType, setUserType] = useState('merchant');

  return (
    <Context.Provider value={{ userType, setUserType }}>
      {children}
    </Context.Provider>
  );
};

export default UserTypeContextProvider;
