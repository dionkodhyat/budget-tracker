
import Login from './pages/Login'
import Register from './pages/Register'
import DashBoard from './pages/Dashboard'
import Error from './pages/Error'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, {useState, useMemo } from 'react'
import { AuthContext } from './context/AuthContext'

function App() {
  const [user, setUser] = useState({value : null, setValue : (newValue) => {
    setUser({...user, value : newValue})
  }})

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);


  return (
    <div className="App">
      <AuthContext.Provider value={value}>
      <Router>
        <Switch>
            <Route path="/" exact component={DashBoard}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <Route path="*" component={Error}/>
        </Switch>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
