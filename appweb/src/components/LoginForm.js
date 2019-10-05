import React, { Component } from 'react';
import classnames from 'classnames';
import {BrowserRouter as Router, Route,Redirect} from 'react-router-dom';
import AuthService from './AuthService';
import { clearErrors } from '../actions/errorActions';
import {isAuthenticated} from '../actions/authentication'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Alert } from 'reactstrap'

export class LoginForm extends Component {
    state = {
        loading: false,
        errors: {},
      
            email: '',
            password: ''
      ,
        msg: null
    };
    constructor(){
        super();
     
        this.Auth = new AuthService();
        
    }
 
  

    // handleChange = (e) => {
    //     console.log(e.target.name)

    //     if (!!this.state.errors[e.target.name]) {
    //         this.setState({
    //             formInputs: { ...this.state.formInputs, [e.target.name]: e.target.value },
    //             errors: { ...this.state.errors, [e.target.name]: '' }
    //         })
    //     } else {
    //         this.setState({ formInputs: { ...this.state.formInputs,[e.target.name]: e.target.value } })
    //     }
    // }
    handleChange =(e)=>{
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    handleSubmit = (e) => {
        e.preventDefault();
  
        this.Auth.login(this.state.email,this.state.password)
            .then(res =>{
              this.props.isAuthenticated();
               this.props.history.replace('/equipements');
            })
            .catch(err =>{
                alert(err);
            })
    } 

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        if (this.Auth.loggedIn()) {
            return <Redirect to={from} />
          }
        return (
            
            <div className="login col-md-3">
                <div className="login-header">
                    <img ref={node => this.logo = node} src="images/logo.svg" alt=""/>
                </div>
                {this.state.msg ? <div className="alert-container"><Alert color="danger">{this.state.msg}</Alert></div> : null}
                <form className="equipement-form" onSubmit={this.handleSubmit}>
                <div className="form-row">
                    <div className={classnames("form-group col-md-12", { error: !!this.state.errors.email })}>
                        <label htmlFor="">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="-@ooredoo.tn"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <span className="input-hint">{this.state.errors.email}</span>
                    </div>
                </div>

                <div className="form-row">
                    <div className={classnames("form-group col-md-12", { error: !!this.state.errors.email })}>
                        <label htmlFor="">Mot de passe</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Mot de passe"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <span className="input-hint">{this.state.errors.password}</span>
                    </div>
                </div>

                <button type="submit" className="btn submit-btn">Se connecter</button>
             </form>
            </div>
        )
    }
}

  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({isAuthenticated}, dispatch)
  } 
  const mapStateToProps = state => {
    return {
       
      Authenticated: state.isAuthenticated
    }
  }

export default connect(mapStateToProps,mapDispatchToProps )(LoginForm); 
