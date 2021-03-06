import {Box} from '@material-ui/core';

import Login from './Components/Login/Login';
import Menu from './Components/Menu/Menu';
import Verification from './Components/Verification/Verification';
import SignUp from './Components/SignUp/SignUp';
import Signed from './Components/SignUp/Signed';

//Routing
import {Route, Switch, Redirect} from 'react-router-dom';
import PrivateRoute from './Tools/PrivateRoute';

const App = () =>
  <Box className="App">
    <Switch>
      <Route exact path="/"><Redirect to="/menu/episodes"/></Route>
      <Route path="/verification"><Verification/></Route>
      <Route path="/acceder"><Login/></Route>
      <Route path="/signup"><SignUp/></Route>
      <Route path="/signed"><Signed/></Route>
      <PrivateRoute path="/menu" component={Menu} />
    </Switch>
  </Box>

export default App;
