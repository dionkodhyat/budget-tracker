
import Login from './pages/Login'
import Register from './pages/Register'
import DashBoard from './pages/Dashboard'
import Error from './pages/Error'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import React, {useState, useMemo} from 'react'
import { AuthContext } from './context/AuthContext'

function App() {
  const [user, setUser] = useState(false);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);



  return (
    <div className="App">
      <Router>
      <AuthContext.Provider value={value}>
        <Switch>
            <ProtectedRoute exact path='/'  component={DashBoard} />
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <Route path="*" component={Error}/>
        </Switch>
        </AuthContext.Provider>
      </Router>
    </div>
  );
}

export default App;
