import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Bookshelves from './components/Bookshelves'
import './App.css'

const App = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/shelf" component={Bookshelves} />
  </Switch>
)

export default App
