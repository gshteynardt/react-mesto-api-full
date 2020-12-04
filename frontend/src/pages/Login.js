import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Header from '../components/Header';
import Form from '../components/Form';
import Input from '../components/Input';
import Footer from '../components/Footer';

const Login = ({onLogin}) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!userData.email || !userData.password) {
      return;
    }
    const { email, password } = userData;
    return await onLogin(email, password)
  };

  return (
  <div className="page">
    <Header>
      <Link to={'/signup'} className="link link_theme_header">Регистрация</Link>
    </Header>
    <Form
      title={'Вход'}
      submitText={'Войти'}
      onSubmit={handleSubmit}
    >
      <Input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="popup__input popup__input_theme_dark"
        onChange={handleChange}
      />

      <Input
        name="password"
        type="password"
        placeholder="Пароль"
        required
        className="popup__input popup__input_theme_dark"
        onChange={handleChange}
      />
    </Form>
    <Footer/>
  </div>
  );
};

export default Login;
