import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import DeudaClientes from './pages/DeudaClientes';


function App() {
  return (
    <div >
      <Router>
          <Switch>
            <Route path="/" exact component={DeudaClientes}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
