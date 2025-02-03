import { createContext, useContext, useState } from 'react';

export const UserDataContext = createContext();

 const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const login = (userData) => {
    setUser(userData);
    setSelectedRole(userData.roles[0]); // Set first role as default
  };

  const logout = () => {
    setUser(null);
    setSelectedRole(null);
    localStorage.removeItem('token');
  };

  const switchRole = (role) => {
    if (user?.roles.includes(role)) {
      setSelectedRole(role);
    }
  };

  return (
    <UserDataContext.Provider 
      value={{ 
        user, 
        selectedRole,
        login, 
        logout, 
        switchRole,
        setUser 
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext