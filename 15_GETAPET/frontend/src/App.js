import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from "react";

/* components */
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Message from "./components/layout/Message";

/* pages */
import Home from "./components/pages/Home";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import AddPet from "./components/pages/Pet/AddPet";

/* contexts */
import messageContext from "./context/messageContext";
import { UserProvider } from "./context/UserContext";

function App() {
  const [message, setMessage] = useState("");

  return (
    <Router>
      <UserProvider>
        <Navbar />
        <messageContext.Provider value={{ message, setMessage }}>
          <Message />
        </messageContext.Provider>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/pet/add">
            <AddPet />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
