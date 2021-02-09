import {Box} from '@material-ui/core';

import Login from './Components/Login/Login';
import Menu from './Components/Menu/Menu'

//Routing
import {Route, Switch, Redirect} from 'react-router-dom'
import PrivateRoute from './Tools/PrivateRoute'

const App = () =>
  <Box className="App">
    <Switch>
      <Route exact path="/"><Redirect to="/menu/episodes"/></Route>
      <Route path="/acceder"><Login/></Route>
      <PrivateRoute path="/menu" component={Menu} />
    </Switch>
  </Box>

export default App;
