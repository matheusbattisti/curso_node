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
import Profile from "./components/pages/User/Profile";
import AddPet from "./components/pages/Pet/AddPet";

/* contexts */
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/user/profile">
            <Profile />
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
