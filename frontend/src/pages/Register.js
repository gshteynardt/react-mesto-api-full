import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Form from '../components/Form';
import Input from '../components/Input';
import Footer from '../components/Footer';

const Register = ({onRegister}) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const link = <Link className="link form__link link_theme_form" to="/signin">Уже зарегистрированы? Войти</Link>;

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!(userData.password && userData.email)) {
      return;
    }
    const { email, password } = userData;
    return await onRegister(email, password);
  };

  return (
    <div className="page">
      <Header>
        <Link to={'/signin'} className="link link_theme_header">Войти</Link>
      </Header>
      <Form
        title="Регистрация"
        submitText="Зарегистрироваться"
        onSubmit={handleSubmit}
        link={link}
      >
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="popup__input popup__input_theme_dark"
          onChange={handleChange}
          value={userData.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Пароль"
          required
          className="popup__input popup__input_theme_dark"
          value={userData.password}
          onChange={handleChange}
        />
      </Form>
      <Footer/>
    </div>
  );
};

export default Register;
