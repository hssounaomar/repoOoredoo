import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './store';
import './App.css';
import Header from './components/Header';
import Equipements from './components/Equipements';
import Interventions from './components/Interventions';
import Categories from './components/Categories';
import Sites from './components/Sites';
import Equipe from './components/Equipe';
import FabMenu from './components/FabMenu';
import EquipementTypes from './components/EquipementTypes'
import Test from './components/Test'
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header></Header>
          <main className="main-panel">
            <Route path="/equipements" exact component={Equipements} />
            <Route path="/equipements/categories" exact component={Categories} />
            <Route path="/equipements/types" exact component={EquipementTypes} />
            <Route path="/equipe" component={Equipe} />
            <Route path="/sites" component={Sites} />
            <Route path="/interventions" component={Interventions} />
            <Route path="/test" component={Test} />
          </main>
        </Router>
      </Provider>
    );
  }
}

export default App;
