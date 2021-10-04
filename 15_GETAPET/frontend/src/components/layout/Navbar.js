import { Link } from "react-router-dom";
import React, { useContext } from "react";

import styles from "./Navbar.module.css";

/* context */
import { userContext } from "../../context/userContext";

/* hooks */
import useLogout from "../../hooks/useLogout";

function Navbar() {
  const { user, isLoading } = useContext(userContext);
  const { logout } = useLogout();

  return (
    <nav className={styles.navbar}>
      <h2>Get A Pet</h2>
      <ul>
        <li>
          <Link to="/">Adotar</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/pet/add">Cadastrar Pet</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Entrar</Link>
            </li>
            <li>
              <Link to="/register">Registar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
