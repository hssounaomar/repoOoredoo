import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import classnames from 'classnames';

import { addEquipementType } from '../actions/equipementTypes.actions'

import { connect } from 'react-redux';
import { getCategories } from '../actions/categories.actions'
class EquipementTypeForm extends React.Component {

  state = {
    loading: false,
    modal: false,
    switchToUrl: false,

    errors: {},
    formInputs: {
      name: '',
      category: '',
      description: ''
    }
  };
componentDidMount(){
    this.props.getCategories();
}
componentWillReceiveProps(nextProps){
  if(nextProps.equipementType){
   
    let formInputs={}
    formInputs.name=nextProps.equipementType.name
    formInputs.description=nextProps.equipementType.description

    if(nextProps.equipementType._id)
    formInputs._id=nextProps.equipementType._id
    this.setState({
formInputs
    })
  }

}

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleChange = (e) => {
    console.log(e.target.name)

    if(!!this.state.errors[e.target.name]) {
      this.setState({ 
        formInputs : {...this.state.formInputs, [e.target.name] : e.target.value},
        errors: {...this.state.errors, [e.target.name] : ''}
      }, ()=> console.log(this.state.formInputs))
    } else {
      this.setState({ 
        formInputs : {...this.state.formInputs, 
        [e.target.name] : e.target.value}
      }, ()=> console.log(this.state.formInputs))

    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    //SET OBLIGATORY FIELDS
    const obligatoryFields = ["name", "category"];
    
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
        this.props.action(newEquipement)
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
                <div className={classnames("form-group col-md-6" , {error : !!this.state.errors.category})}>
                <label >Catégorie</label>
                  <select 
                    className="form-control"
                    name="category"
                    value={this.state.formInputs.category}
                    onChange={this.handleChange}
                  >
                    <option defaultValue>Categorie</option>
                    {this.props.categories.map( category => 
                      <option key={category._id} value={category._id}>{category.name}</option>
                    )}
                  </select>
                  <span className="input-hint">{this.state.errors.category}</span>
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

const mapStateToProps = state => {
    return {
      categories: state.categories
    }
  }


export default connect(mapStateToProps, {getCategories,addEquipementType})(EquipementTypeForm);