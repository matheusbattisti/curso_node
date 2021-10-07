import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../form/Input";

/* contexts */
import messageContext from "../../../context/messageContext";

function Login() {
  const [auth, setAuth] = useState({});
  const history = useHistory();

  const MessageContext = useContext(messageContext);

  function handleChange(e) {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(auth);
    // MessageContext.setMessage('eta')

    // console.log(MessageContext.message)

    axios
      .post(`http://localhost:5000/users/login`, auth, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        const data = response.data;
        console.log(data);
        history.push("/");
      });
  };

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o e-mail"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Entrar" />
      </form>
    </section>
  );
}

export default Login;
