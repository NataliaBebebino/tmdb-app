import { createContext, useState } from "react";

const UserContext = createContext({
  isAuthenticated: false,
  user: null,
  login: (user) => {},
  logout: () => {},
});

export function UserContextProvider(props) {
  const [user, setUser] = useState(null);

  function loginHandler(user) {
    setUser(user);
  }

  function logoutHandler() {
    setUser(null);
  }

  const context = {
    isAuthenticated: user !== null,
    user: user,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
