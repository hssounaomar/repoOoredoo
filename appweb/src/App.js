import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Redirect} from 'react-router-dom';

import io from 'socket.io-client';
import { loadUser } from "./actions/authActions";
import './App.css';
import Header from './components/Header';
import Equipements from './components/Equipements';
import Interventions from './components/Interventions';
import Categories from './components/Categories';
import Sites from './components/Sites';
import Equipe from './components/Equipe';

import EquipementTypes from './components/EquipementTypes'
import Suppliers from './components/Suppliers';
import Statistics from './components/Statistics';
import Login from './components/LoginForm';
import Register from './components/SignupForm';
import Stats from './components/Stats';
import AuthRequired from './utils/AuthRequired';
import AuthService from './components/AuthService';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import  {isAuthenticated} from './actions/authentication'
const ROOT_URL = "http://localhost:5000";

export const socket = io(ROOT_URL);
const Auth = new AuthService();
class App extends Component {
 componentDidMount(){
   this.props.isAuthenticated();
 }
  
  styleIt = (isAuth) => {
    return {
      ...(!isAuth && {display: 'flex'}),
      ...(!isAuth && {justifyContent: 'center'}),
      ...(!isAuth && {alignItems: 'center'}),
      ...(!isAuth && {background: "url('/images/pattern.svg')"}),
      minHeight: isAuth? 'calc(100vh - 100px)' : '100vh'
    }
  }


  render() {
   
    const navBar = this.props.Authenticated? <Header /> : ''
    return(

<Router>
{navBar}
  <main className="main-panel" style={this.styleIt(this.props.Authenticated)}>
    
    
    <Route path="/login" exact component={ Login } />
    <Route path="/signup/:token" exact component={Register} />
    <Route exact path="/equipements" exact component={AuthRequired(Equipements,['agent','admin'])} />
    <Route path="/equipements/categories" exact component={AuthRequired(Categories,['agent','admin'])} />
    <Route path="/equipements/types" component={AuthRequired(EquipementTypes,['agent','admin'])} />
    <Route path="/equipe" component={AuthRequired(Equipe,['admin'])} />
    <Route path="/sites" component={AuthRequired(Sites,['agent','admin'])} />
    <Route path="/interventions" component={AuthRequired(Interventions,['agent','admin'])} />
    <Route path="/statistics" component={AuthRequired(Statistics,['agent','admin'])} />
    <Route render={() => <Redirect to="/login" />} />
  </main>
</Router>


    );
  }
}
const mapStateToProps = state => {
  return {
     
    Authenticated: state.isAuthenticated
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({isAuthenticated}, dispatch)
} 


export default connect(mapStateToProps,mapDispatchToProps )(App);

