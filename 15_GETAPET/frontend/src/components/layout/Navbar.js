import { Link } from "react-router-dom";
import React, { useContext } from "react";

import styles from "./Navbar.module.css";

/* contexts */
import { Context } from "../../context/UserContext";

/* hooks */

function Navbar() {
  const { authenticated, logout } = useContext(Context);

  return (
    <nav className={styles.navbar}>
      <h2>Get A Pet</h2>
      <ul>
        <li>
          <Link to="/">Adotar</Link>
        </li>
        {authenticated ? (
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
