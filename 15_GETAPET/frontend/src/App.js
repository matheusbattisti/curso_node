import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useState } from 'react'

/* components */
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Message from './components/layout/Message'

/* pages */
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'

/* contexts */
import messageContext from './context/messageContext'
import { userContext } from './context/userContext'

/* hooks */
import useFindUser from './hooks/useFindUser'

function App() {
  const [message, setMessage] = useState('')
  const { user, setUser, isLoading } = useFindUser()

  return (
    <Router>
      <userContext.Provider value={{ user, setUser, isLoading }}>
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
          <Route path="/">
            <Home />
          </Route>
        </Switch>

        <Footer />
      </userContext.Provider>
    </Router>
  )
}

export default App
