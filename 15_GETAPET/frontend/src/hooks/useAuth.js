import api from "../api";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function register(user) {
    const data = await api
      .post(`http://localhost:5000/users/register`, user)
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.log(err));

    setAuthenticated(true);
    localStorage.setItem("token", JSON.stringify(data.token));

    history.push("/users");
  }

  async function handleLogin() {
    const {
      data: { token },
    } = await api.post("/authenticate");

    localStorage.setItem("token", JSON.stringify(token));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthenticated(true);
    history.push("/users");
  }

  function logout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    history.push("/login");
  }

  return { authenticated, loading, register, handleLogin, logout };
}
