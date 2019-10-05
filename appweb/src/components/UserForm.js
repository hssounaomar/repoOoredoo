import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import classnames from 'classnames';

import { addUser,updateuser } from '../actions/users'

import { connect } from 'react-redux';

class UserForm extends React.Component {

  state = {

    switchToUrl: false,

    errors: {},
    formInputs: {
        firstName: '',
        lastName: '',
        email:'',
        tel:'',
        password:'',
        role:''
    }
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.user){
  
      this.setState({
        formInputs:nextProps.user
      })
    }
  if(nextProps.titleForm==="Ajouter"&&nextProps.role){
    this.setState({
      formInputs:{
       ... this.state.formInputs,
      role: nextProps.role
      }
    })
  }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleChange = (e) => {
 

    if(!!this.state.errors[e.target.name]) {
      this.setState({ 
        formInputs : {...this.state.formInputs, [e.target.name] : e.target.value},
        errors: {...this.state.errors, [e.target.name] : ''}
      })
    } else {
      this.setState({ 
        formInputs : {...this.state.formInputs, 
        [e.target.name] : e.target.value}
      })

    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    //SET OBLIGATORY FIELDS
    const obligatoryFields = ["firstName",'lastName',"email","tel","password","role"];
    
    //CHECK EMPTY FIELDS & ADD ERROR MESSAGE
    obligatoryFields.forEach( key => {
      if(this.state.formInputs[key] === "") errors[key] = 'Ce champs est obligatoire'
    })
    
    this.setState({errors}, () => {
      const isValid = !Object.keys(this.state.errors).length;
      if(isValid) {
        //this.setState({loading : true})
        
        let newUser = {...this.state.formInputs}
        Object.keys(newUser).forEach( key => {
          if(newUser[key] === '') {
            delete newUser[key];
          }
        })
        if(this.props.titleForm==="Ajouter"){
          console.log(newUser)
          this.props.addUser(newUser)
        }
        
        if(this.props.titleForm==="Modifier")
        this.props.updateuser(newUser);
      }
    });
  }

  

  render() {
    
    return (
      <div>
       
        <Modal isOpen={this.props.form} toggle={this.props.toggleForm} className={this.props.className}>
          <div className="modal-header">
            <div className="modal-title">{this.props.titleForm==="Ajouter"?"Ajouter":"Modifier"} un {this.props.role==="agent"?"Agent":"Fournisseur"}</div> 
            <button className="close" onClick={this.props.toggleForm}>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <ModalBody>
            <div className={classnames('loading-overlay',{show: this.state.loading})}>
              <div className="spinner-border text-danger" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
            <form className="equipement-form" onSubmit={this.handleSubmit}>
              <div className="form-row">
                <div className={classnames("form-group col-md-6" , {error : !!this.state.errors.firstName})}>
                  <label htmlFor="">Nom</label>
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="Nom" 
                    name="firstName"
                    value={this.state.formInputs.firstName}
                    onChange={this.handleChange}
                  />
                  <span className="input-hint">{this.state.errors.firstName}</span>
                </div>
                <div className={classnames("form-group col-md-6" , {error : !!this.state.errors.lastName})}>
                  <label htmlFor="">Prénom</label>
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="Prénom" 
                    name="lastName"
                    value={this.state.formInputs.lastName}
                    onChange={this.handleChange}
                  />
                  <span className="input-hint">{this.state.errors.lastName}</span>
                </div>
              
              </div>

              <div className="form-row">
              <div className={classnames("form-group col-md-6" , {error : !!this.state.errors.email})}>
                  <label htmlFor="">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Email"
                    name="email"
                    value={this.state.formInputs.email}
                    onChange={this.handleChange} 
                  />
                  <span className="input-hint">{this.state.errors.email}</span>
                </div>
                <div className={classnames("form-group col-md-6" , {error : !!this.state.errors.password})}>
                  <label htmlFor="">Password</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Password"
                    name="password"
                    value={this.state.formInputs.password}
                    onChange={this.handleChange} 
                  />
                  <span className="input-hint">{this.state.errors.password}</span>
                </div>
              </div>

              <div className="form-row">
              <div className={classnames("form-group col-md-12" , {error : !!this.state.errors.tel})}>
                  <label htmlFor="">Tel</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Tel"
                    name="tel"
                    value={this.state.formInputs.tel}
                    onChange={this.handleChange} 
                  />
                  <span className="input-hint">{this.state.errors.tel}</span>
                </div>
               
              </div>
              <button type="submit" className="btn submit-btn">sauvegrader</button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default connect(null, {addUser,updateuser})(UserForm);