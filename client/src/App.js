import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage'
import HomePage from './Components/HomePage/HomePage'
import CreateVideogame from './Components/CreateVideogame/CreateVideogame'
import Detail from './Components/Detail/Detail'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
<Route exact path= '/' component= {LandingPage}/>
<Route exact path= '/home' component= {HomePage}/>
<Route exact path= '/videogames' component= {CreateVideogame}/>
<Route exact path= '/home/:id' component= {Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
