import React, { Component } from 'react'


import {getAgents,deleteUserById,getUsers} from '../actions/users';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import User from './User'
import UserForm from './UserForm';
import ModalDialog from './ModalDialog';
class  Equipe  extends Component {
    state ={
        identifier:null,
        modal:false,
        form:false,
        action:null,
        titleForm:'',
        deletedUser:null
    }
    componentDidMount() {
        this.props.getUsers();
    }
  
 
    toggleForm = (identifier,titleForm) => {
        identifier
        ?
        this.setState({ identifier,titleForm, form: !this.state.form }, () => console.log(this.state.identifier))
        :
        this.setState({ form: !this.state.form })
    }
    toggleModal = () => {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
    setDeletedUser=(deletedUser)=>{
        this.setState({
            deletedUser
        })
    }
      deleteUser =()=>{
this.props.deleteUserById(this.state.deletedUser);
      }
      
displayUsers =()=>{
    
       return this.props.users.filter(user=>user.role==='agent').map(user=>{
return (
    <User user={user} key={user._id} setDeletedUser={this.setDeletedUser} toggleForm={this.toggleForm}    toggle={this.toggleModal} ></User>
)
        })
    
    
}
addUser= (e) => {
    this.setState({ titleForm: 'Ajouter' }, () => {
      this.toggleForm();
    })
  }
    render(){
    
        return(
            <div className="equipements">
                <div className="container">
                <div className="filter-bar">
        <div className="stickies">
     
        </div>
        <div className="filter-bar-right">
       
        <button className="new-equipement btn" onClick={this.addUser}>Nouveau Agent</button>
        <UserForm user={this.state.identifier} role="agent" form={this.state.form} toggleForm={this.toggleForm} titleForm={this.state.titleForm}></UserForm>
        <ModalDialog toggle={this.toggleModal} modal={this.state.modal} delete={this.deleteUser}/>
      
        </div>
      </div>
                    <div className="items">
         {this.displayUsers()}
         </div>
         </div>
         </div>
        )
    }
}

const mapStateToProps =(state)  => {
    return {
      users: state.users
     
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getAgents,deleteUserById,getUsers }, dispatch)
}    

export default connect(mapStateToProps,mapDispatchToProps)(Equipe)
