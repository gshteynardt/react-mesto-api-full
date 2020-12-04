import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import MainPage from '../pages/MainPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from '../hocs/ProtectedRoute';
import { token } from '../utils/token';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const history = useHistory();

  useEffect(() => {
    tokenCheck()
  }, [loggedIn]);

  const closeInfoPopup = () => {
    setIsOpen(false);
  };

  const onSuccessPopup = (boolean) => {
    setIsOpen(true);
    setIsSuccess(boolean);
  };

  const offSuccessPopup = (boolean) => {
    setIsOpen(true);
    setIsSuccess(boolean);
  };

  const tokenCheck = async () => {
    try {
      const jwt = token.get('mesto');
      if (jwt) {
        const res = await auth.checkToken(jwt);
        if (res) {
          setUserData(res);
          setLoggedIn(true);
          history.push('/cards');
        } else if (res.message) {
          console.log({ message: `${res.message}` });
        }
      }
    } catch (err) {
      console.log({ message: err.name }, err);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const data = await auth.login(email, password);
      if (data.token) {
        token.set('mesto', data.token);
        await tokenCheck();
        onSuccessPopup(true);
        return data;
      }
    } catch (err) {
      offSuccessPopup(false)
      console.log({ message: 'Что-то пошло не так' }, err);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      const res = await auth.register(email, password);

      if (res.data) {
        setUserData({
          email: '',
          password: '',
        });
        onSuccessPopup(true)
        return history.push('/signin');
      } if (res.error) {
        offSuccessPopup(false)
        console.log({ message: `${res.error}` });
      }
    } catch (err) {
      offSuccessPopup(false)
      console.log({ message: 'Что-то пошло не так' }, err);
    }
  };

  return (
    <>
      <Switch>
        <ProtectedRoute
          path="/cards"
          loggedIn={loggedIn}
        >
          <MainPage userData={userData}/>
        </ProtectedRoute>
        <Route path="/signup">
          <Register
            onRegister={handleRegister}
          />
        </Route>
        <Route path="/signin">
          <Login onLogin={handleLogin}/>
        </Route>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/cars"/> : <Redirect to="signin"/>}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      <InfoTooltip
        isSuccess={isSuccess}
        isOpen={isOpen}
        onClose={closeInfoPopup}
      />
    </>
  );
};

export default App;
