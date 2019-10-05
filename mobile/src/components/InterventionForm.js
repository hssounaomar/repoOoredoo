import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { getEquipements } from '../actions/equipements.actions';
import {getSites} from '../actions/sites.actions';
import {getSuppliers,getAgents} from '../actions/users';
import {getFailures} from '../actions/failures.actions';
import {addIntervention,updateStateOfIntervention} from '../actions/interventions.actions';
import { bindActionCreators } from 'redux'
import Select from 'react-select'
import dateFns from 'date-fns'
class InterventionForm extends React.Component {

  state = {
    loading: false,
 
    switchToUrl: false,
displayEquipement:true,
    errors: {},
    formInputs: {
      title: '',
      observation:'',
      failures:[],
      start:''
    }
  };
 
  displayAgents =()=>{
    return this.props.agents.map(agent=>{return  { value: agent._id, label: agent.firstName } ;})
  }
  displaySuppliers =()=>{
    return this.props.suppliers.map(supplier=>{return  { value: supplier._id, label: supplier.firstName } ;})
  }
  displayEquipements =()=>{
    //display equipements
    if(this.props.equipements)
    return this.props.equipements.map(equipement=>{return  { value: equipement._id, label: equipement.brand } ;});

  }
  displayFailures =()=>{
    return this.props.failures.map(failure=>{return  { value: failure._id, label: failure.name } ;})
  }
  componentDidMount() { 
    this.props.getEquipements();
    this.props.getSites();
    this.props.getSuppliers();
    this.props.getAgents();
    this.props.getFailures();
}
 
  componentWillReceiveProps(nextProps){
      if(nextProps.date){
        
          this.setState({
              formInputs:{
                  
                  ...this.state.formInputs
              }
          })
      }
    if(nextProps.intervention){
    console.log(nextProps.intervention);
   this.setState({
     formInputs:{
       ...nextProps.intervention,
       start:dateFns.format(new Date(nextProps.intervention.start), 'YYYY-MM-DDThh:mm')
     }
   },()=>{
     console.log(this.state.formInputs);
   })
   
    //this.formInputs.title=nextProps.intervention.title;
    }
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
    
if(this.state.formInputs.type==="curative"){
delete this.state.formInputs.site;
}else{
  delete this.state.formInputs.equipement;
}

    let errors = {};

    //SET OBLIGATORY FIELDS
    const obligatoryFields = ["title", "end","start","periode","type"];
    
    //CHECK EMPTY FIELDS & ADD ERROR MESSAGE
    obligatoryFields.forEach( key => {
      if(this.state.formInputs[key] === "") errors[key] = 'Ce champs est obligatoire'
    })
    
    this.setState({errors}, () => {
      const isValid = !Object.keys(this.state.errors).length;
      if(isValid) {
        //this.setState({loading : true})
        
        let intervention = {...this.state.formInputs}
        Object.keys(intervention).forEach( key => {
          if(intervention[key] === '') {
            delete intervention[key];
          }
        })

       // this.props.addIntervention(intervention);
       intervention.state="confirme";
       console.log(intervention);
       this.props.updateStateOfIntervention(intervention._id,intervention);
       console.log(intervention)
      }
    });
  }

  handleAgents =(options)=>{
if(options){
 let equipements=options.map(option=>{
   return option.value;
 })
 this.setState({
formInputs:{
  ...this.state.formInputs,
  equipements

}
 },()=>{
   console.log(this.state.agents)
 })
}
  }

  handleFailures =(options)=>{
    if(options){
     let failures=options.map(option=>{
       return option.value;
     })
     this.setState({
      formInputs:{
        ...this.state.formInputs,
        failures
      
      }
     },()=>{
       console.log(this.state.failures)
     })
    }
      }
      handleEquipement =(option)=>{
if(this.state.displayEquipement){
  this.setState({
    formInputs:{
      ...this.state.formInputs,
      equipement:option.value
    
    }
  })
}else{
  this.setState({
    formInputs:{
      ...this.state.formInputs,
      site:option.value
    
    }
  })
}
      }
      handleSupplier =(option)=>{
if(option){
  this.setState({
    formInputs:{
      ...this.state.formInputs,
      supplier:option.value
    
    }
  })
}
      }
      displaySelectedFailures = ()=>{
        if(this.props.failures&&this.props.intervention&&this.props.intervention.failures)
          return this.displayFailures().filter(failure=>this.props.intervention.failures.includes(failure.value));
      }
      displaySites =()=>{
        //display equipements
        if(this.props.sites)
        
        return this.props.sites.map(site=>{return  { value: site._id, label: site.name } ;})
        else 
        return [];
      }
      displaySelectedSite = ()=>{
        if(this.props.sites&&this.props.intervention&&this.props.intervention.site)
          return this.displaySites().filter(site=>site.value===this.props.intervention.site)
       
      }
  render() {

    return (
      <div>
       
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
          <div className="modal-header">
            <div className="modal-title">Confirmation</div>
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
            <div className={classnames("form-group col-md-6" , {error : !!this.state.errors.title} )}>
             <label >Title</label>
             <input 
                    type="title" 
                    className="form-control"
                    placeholder="Title" 
                    name="title"
                    value={this.state.formInputs.title}
                    disabled
                  />
               <span className="input-hint">{this.state.errors.title}</span>
             </div>
         
             <div className={classnames("form-group col-md-6" ,{error : !!this.state.errors.site} )}>
                <label >Site</label>
                <Select isDisabled={true} options={this.displaySites()} defaultValue={this.displaySelectedSite()}  name='site' className="basic-multi-select" classNamePrefix="select"  />
                  <span className="input-hint"></span>
                </div>
          
            </div>
          <div className="form-row">
          <div className={classnames("form-group col-md-12" , {error : !!this.state.errors.start} )}>
             <label >Debut</label>
             <input 
                    type="datetime-local" 
                    className="form-control"
                    placeholder="Debut" 
                    name="start"
                    value={this.state.formInputs.start}
                    onChange={this.handleChange}
                    disabled
                  />
               <span className="input-hint">{this.state.errors.start}</span>
             </div>
          </div>
              <div className="form-row">
             
                <div className={classnames("form-group col-md-12" , {error : !!this.state.errors.agents} )}>
                <label >Equipements</label>
                <Select options={this.displayEquipements()} name='agents' className="basic-multi-select" classNamePrefix="select" onChange={this.handleAgents}  isMulti />
                  <span className="input-hint">{this.state.errors.agents}</span>
                </div>
               </div>



              <div className="form-row">
             
                <div className={classnames("form-group col-md-12" , {error : !!this.state.errors.failures} )}>
                <label >Pannes</label>
                <Select options={this.displayFailures()} defaultValue={this.displaySelectedFailures()} name='failures' className="basic-multi-select" classNamePrefix="select" onChange={this.handleFailures} defaultValue={this.displaySelectedFailures()}  isMulti />
   
                  <span className="input-hint">{this.state.errors.failures}</span>
                </div>
              </div>
<div className="form-row">
             
             <div className={classnames("form-group col-md-12" , {error : !!this.state.errors.observation} )}>
             <label >Observation</label>
             <textarea
                 
                    className="form-control"
                    placeholder="Observation" 
                    name="observation"
                    value={this.state.formInputs.observation}
                    onChange={this.handleChange}
                  />
               <span className="input-hint">{this.state.errors.observation}</span>
             </div>
            </div>
            <div className="form-row">
             
             <div className={classnames("form-group col-md-12" , {error : !!this.state.errors.description} )}>
             <label >Description</label>
             <textarea
                 disabled
                    className="form-control"
                    name="description"
                    value={this.state.formInputs.description}
                   
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
      equipements: state.equipements,
      sites: state.sites,
      suppliers:state.suppliers,
      agents:state.agents,
      failures:state.failures
    }
  }
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({getEquipements,getSites,getSuppliers,getAgents,getFailures,addIntervention,updateStateOfIntervention}, dispatch)
}    
export default connect(mapStateToProps,mapDispatchToProps )(InterventionForm);