import api from "../utils/api";
import bus from "../utils/bus";

import { useState, useEffect, useContext } from "react";
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
    try {
      const data = await api.post("/users/register", user).then((response) => {
        return response.data;
      });

      await authUser(data);

      bus.emit("flash", {
        message: "Cadastro realizado com sucesso!",
        type: "success",
      });
    } catch (error) {
      // tratar erro
      console.log(error.response);
    }
  }

  async function login(user) {
    try {
      const data = await api.post("/users/login", user).then((response) => {
        return response.data;
      });

      await authUser(data);

      bus.emit("flash", {
        message: "Login realizado com sucesso!",
        type: "success",
      });
    } catch (error) {
      // tratar erro
      console.log(error.response);
    }
  }

  async function authUser(data) {
    setAuthenticated(true);
    localStorage.setItem("token", JSON.stringify(data.token));

    history.push("/");
  }

  function logout() {
    bus.emit("flash", {
      message: "Logout realizado com sucesso!",
      type: "success",
    });

    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    history.push("/login");
  }

  return { authenticated, loading, register, login, logout };
}
