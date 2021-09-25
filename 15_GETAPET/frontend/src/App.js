import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

/* components */
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

/* pages */
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'

function App() {
  return (
    <Router>
      <Navbar />
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
    </Router>
  )
}

export default App
