import React, { useState } from "react";
import { useHTTP } from "../hooks/http.hook";

export const AuthPage = () => {
  // eslint-disable-next-line
  const { loading, error, request, clearError } = useHTTP();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  const handleRegistrationButtonClick = async () => {
    try {
      const data = await request("api/auth/register", "POST", { ...form });
      console.log("data", data);
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизаия</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Введите email"
                  id="email"
                  name="email"
                  type="text"
                  onChange={handleFormChange}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleFormChange}
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
            >
              Войти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={handleRegistrationButtonClick}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};