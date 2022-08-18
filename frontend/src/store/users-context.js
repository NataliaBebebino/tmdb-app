import { createContext, useState, useEffect} from "react";

const UserContext = createContext({
  isAuthenticated: false,
  user: null,
  login: (user) => {},
  logout: () => {},
});

export function UserContextProvider(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setUser(JSON.parse(user));
  }, []);

  function loginHandler(user) {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  function logoutHandler() {
    setUser(null);
    localStorage.setItem('user', JSON.stringify(null));
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
