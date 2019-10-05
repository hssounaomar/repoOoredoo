import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import classnames from 'classnames';

import { addSite } from '../actions/sites.actions'

import { connect } from 'react-redux';

class SiteForm extends React.Component {

  state = {
    loading: false,
    modal: false,

    errors: {},
    formInputs: {
      name: '',
      description: '',
      latitude:'',
      longitude:'',
      type:'',
      address:'',
      floorsNumber:'',
      responsibleName:'',
      responsibleNumber:''
    }
  };


  handleChange = (e) => {
   

    if(!!this.state.errors[e.target.name]) {
      this.setState({ 
        formInputs : {...this.state.formInputs, [e.target.name] : e.target.value},
        errors: {...this.state.errors, [e.target.name] : ''}
      }, ()=> console.log(this.state.formInputs))
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
    const obligatoryFields = ["name", 'type',"address","floorsNumber","responsibleName","responsibleNumber"];
    
    //CHECK EMPTY FIELDS & ADD ERROR MESSAGE
    obligatoryFields.forEach( key => {
      if(this.state.formInputs[key] === "") errors[key] = 'Ce champs est obligatoire'
    })
    
    this.setState({errors}, () => {
      const isValid = !Object.keys(this.state.errors).length;
      if(isValid) {
        //this.setState({loading : true})
        
        let newEquipement = {...this.state.formInputs}
        Object.keys(newEquipement).forEach( key => {
          if(newEquipement[key] === '') {
            delete newEquipement[key];
          }
        })
        this.props.addCategorie(newEquipement)
      }
    });
  }

  

  render() {
    
    return (
      <div>
       
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
          <div className="modal-header">
            <div className="modal-title">Ajouter un Categorie</div>
            <button className="close" onClick={this.props.toggle}>
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
                <div className={classnames("form-group col-md-6" , {error : !!this.state.errors.name})}>
                  <label htmlFor="">Nom</label>
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="Nom" 
                    name="name"
                    value={this.state.formInputs.name}
                    onChange={this.handleChange}
                  />
                  <span className="input-hint">{this.state.errors.name}</span>
                </div>
                <div className={classnames("form-group col-md-6" , {error : !!this.state.errors.address})}>
                  <label htmlFor="">Adresse</label>
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="Nom" 
                    name="address"
                    value={this.state.formInputs.address}
                    onChange={this.handleChange}
                  />
                  <span className="input-hint">{this.state.errors.address}</span>
                </div>
              
              </div>

              <div className="form-row">
              <div className={classnames("form-group col-md-6" , {error : !!this.state.errors.longitude})}>
                  <label htmlFor="">Longitude</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Longitude"
                    name="longitude"
                    value={this.state.formInputs.longitude}
                    onChange={this.handleChange} 
                  />
                  <span className="input-hint">{this.state.errors.longitude}</span>
                </div>
                <div className={classnames("form-group col-md-6" , {error : !!this.state.errors.latitude})}>
                  <label htmlFor="">Latitude</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Latitude"
                    name="latitude"
                    value={this.state.formInputs.latitude}
                    onChange={this.handleChange} 
                  />
                  <span className="input-hint">{this.state.errors.latitude}</span>
                </div>
              </div>

              <div className="form-row">
                <div className={classnames("form-group col-md-6" , {error : !!this.state.errors.floorsNumber})}>
                  <label htmlFor="">FloorsNumber</label>
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="Nom" 
                    name="floorsNumber"
                    value={this.state.formInputs.floorsNumber}
                    onChange={this.handleChange}
                  />
                  <span className="input-hint">{this.state.errors.floorsNumber}</span>
                </div>
                <div className={classnames("form-group col-md-6" , {error : !!this.state.errors.type})}>
                  <label htmlFor="">Modèle</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Type"
                    name="type"
                    value={this.state.formInputs.type}
                    onChange={this.handleChange} 
                  />
                  <span className="input-hint">{this.state.errors.type}</span>
                </div>
              </div>


            

              <div className="form-row">
                <div className={classnames("form-group col-md-6" , {error : !!this.state.errors.responsibleName})}>
                  <label htmlFor="">RresponsibleNumberesponsibleName</label>
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="Nom" 
                    name="responsibleName"
                    value={this.state.formInputs.responsibleName}
                    onChange={this.handleChange}
                  />
                  <span className="input-hint">{this.state.errors.responsibleName}</span>
                </div>
                <div className={classnames("form-group col-md-6" , {error : !!this.state.errors.responsibleNumber})}>
                  <label htmlFor="">ResponsibleNumber</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Type"
                    name="responsibleNumber"
                    value={this.state.formInputs.responsibleNumber}
                    onChange={this.handleChange} 
                  />
                  <span className="input-hint">{this.state.errors.responsibleNumber}</span>
                </div>
              </div>


              <div className="form-row">
              <div className={classnames("form-group col-md-12")}>
                  <label htmlFor="">Description</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Description"
                    name="description"
                    value={this.state.formInputs.description}
                    onChange={this.handleChange} 
                  />
                
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



export default connect(null, {addSite})(SiteForm);