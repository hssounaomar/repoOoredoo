import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { getEquipements } from '../actions/equipementsActions';
import {getSites} from '../actions/sitesActions';
import {getSuppliers,getAgents} from '../actions/users';
import {getFailures} from '../actions/failuresActions';
import {addIntervention, completeIntervention,deleteInterventionById,updateIntervention} from '../actions/interventions.actions';
import { bindActionCreators } from 'redux'
import Select from 'react-select'


import dateFns from 'date-fns';
class InterventionForm extends React.Component {

  state = {
    loading: false,
    errors: {},
    title:null,
    formInputs: {
      type: 'curative',
      title: '',
      description: '',
      site:'',
      equipement:'',
      agents:[],
      supplier:null,
      failures:[],
      periode:''
    }
  };
  displayObservation=()=>{
if(this.props.intervention&&this.props.intervention.state==="confirme"){
  return (  <div className="form-row">
  <div className={classnames("form-group col-md-12")}>
      <label htmlFor="">Observation</label>
      <textarea
                    type="observation" 
                    className="form-control"
                    placeholder="" 
                    name="observation"
                    value={this.props.intervention.observation}
                    disabled
                  />
    </div>
  </div>)
}
  }
  refonteIntervention=()=>{
    this.state.formInputs.state="en cours";
    this.props.updateIntervention(this.state.formInputs)
  }
  displayButtons=()=>{
    if(this.props.intervention===null)
    return(<div className="form-row"><button type="submit" className="btn btn-success">sauvegrader</button></div>)
    switch(this.props.intervention.state){
      case "en cours":
        return(
          <div className="form-row">
          <button type="submit" onClick={()=>this.props.updateIntervention(this.state.formInputs)} className="btn btn-warning">Modifier</button>
          <button type="submit" onClick={()=>this.props.deleteInterventionById(this.props.intervention._id)} className="btn submit-btn">Supprimer</button>
 <button type="submit" onClick={()=>this.props.completeIntervention(this.props.intervention._id)} className="btn btn-success">Cloturer</button>
 </div>);
 case "confirme":
    return(
      <div className="form-row">
      <button type="submit" onClick={()=>this.refonteIntervention()} className="btn btn-warning">ReFonter</button>
      <button type="submit" onClick={()=>this.props.deleteInterventionById(this.props.intervention._id)} className="btn submit-btn">Supprimer</button>
<button type="submit" onClick={()=>this.props.completeIntervention(this.props.intervention._id)} className="btn btn-success">Cloturer</button>
</div>);
    }
  }
  displayAgents =()=>{
    if(this.props.agents)
    return this.props.agents.map(agent=>{return  { value: agent._id, label: agent.firstName } ;})
    else 
    return [];
  }
  displaySuppliers =()=>{
    if(this.props.suppliers)
    return this.props.suppliers.map(supplier=>{return  { value: supplier._id, label: supplier.firstName } ;})
    else 
    return [];
  }
  displaySites =()=>{
    //display equipements
    if(this.props.sites)
    
    return this.props.sites.map(site=>{return  { value: site._id, label: site.name } ;})
    else 
    return [];
  }
  displayEquipements = () => {
    //display equipements
    if(this.props.sites)
    //display sites based on the selected option (type)
    return this.props.equipements.map(site=>{return  { value: site._id, label: site.reference } ;})
    else 
    return [];
  }
  displayFailures =()=>{
    if(this.props.failures)
    return this.props.failures.map(failure=>{return  { value: failure._id, label: failure.name } ;})
    else 
    return [];
  }
  displaySelectedSite = ()=>{
    if(this.props.sites&&this.props.intervention&&this.props.intervention.site)
      return this.displaySites().filter(site=>site.value===this.props.intervention.site)
   
  }
  displaySelectedSupplier = ()=>{
    if(this.props.suppliers&&this.props.intervention&&this.props.intervention.supplier)
      return this.displaySuppliers().filter(supplier=>supplier.value===this.props.intervention.supplier)
   
  }
  displaySelectedEquipement = ()=>{
    if(this.props.equipements&&this.props.intervention&&this.props.intervention.equipement)
      return this.displayEquipements().filter(equipement=>equipement.value===this.props.intervention.equipement)
   
  }
  displaySelectedType=()=>{
    if(this.state.formInputs){
      return this.state.formInputs.type;
    }
  }
  displaySelectedFailures = ()=>{
    if(this.props.failures&&this.props.intervention&&this.props.intervention.failures)
      return this.displayFailures().filter(failure=>this.props.intervention.failures.includes(failure.value));
  }
  displaySelectedAgents = ()=>{
    if(this.props.agents&&this.props.intervention&&this.props.intervention.agents)
      return this.displayAgents().filter(agent=>this.props.intervention.agents.includes(agent.value));
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
                  
                  ...this.state.formInputs,
                  start:nextProps.date,
                  end:nextProps.date
              }
          })
      }
      if(nextProps.intervention){
        
        let formInputs=nextProps.intervention;
        delete formInputs.__v;
        formInputs.id=formInputs._id;
        
        formInputs.start=dateFns.format(new Date(formInputs.start), 'YYYY-MM-DDThh:mm');
        formInputs.end=dateFns.format(new Date(formInputs.end), 'YYYY-MM-DDThh:mm');
        this.setState({
          formInputs
        })
        
        
      }
      if(nextProps.intervention===null){
        this.setState({
          formInputs: {
            type:'curative',
            title: '',
            description: '',
            site:'',
            equipement:'',
            agents:[],
            supplier:null,
            failures:[],
            periode:''
      
      
          } 
        })
      }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.date) {

      this.setState({
        formInputs: {

          ...this.state.formInputs,
          start: nextProps.date,
          end: nextProps.date
        }
      })
    }

  }

  handleChange = (e) => {
    console.log(e.target.name)

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
    const obligatoryFields = ["title", ,"periode","type"];
    
    //CHECK EMPTY FIELDS & ADD ERROR MESSAGE
    obligatoryFields.forEach(key => {
      if (this.state.formInputs[key] === "") errors[key] = 'Ce champs est obligatoire'
    })

    this.setState({ errors }, () => {
      const isValid = !Object.keys(this.state.errors).length;
      if (isValid) {
        //this.setState({loading : true})

        let intervention = { ...this.state.formInputs }
        Object.keys(intervention).forEach(key => {
          if (intervention[key] === '') {
            delete intervention[key];
          }
        })
        this.props.addIntervention(intervention, this.props.agents);
      }
    });
  }

  handleAgents = (options) => {
    if (options) {
      let agents = options.map(option => {
        return option.value;
      })
      this.setState({
        formInputs: {
          ...this.state.formInputs,
          agents

}
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
     })
    }
      }
      handleSite =(option)=>{
       
        this.setState({
          formInputs:{
            ...this.state.formInputs,
            site:option.value
          
          }
        })
      }
      handleEquipement =(option)=>{

  this.setState({
    formInputs:{
      ...this.state.formInputs,
      equipement:option.value
    
    }
  })
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
     
  render() {
 
    return (

      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
          <div className="modal-header">
            <div className="modal-title">{this.props.titleOfForm}
            </div>
            <button className="close" onClick={this.props.toggle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <ModalBody>
            <div className={classnames('loading-overlay', { show: this.state.loading })}>
              <div className="spinner-border text-danger" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
            <form className="equipement-form" onSubmit={this.handleSubmit}>
            <div className="form-row">
             
             <div className={classnames("form-group col-md-4" , {error : !!this.state.errors.title} )}>
             <label >Title</label>
             <input 
                    type="title" 
                    className="form-control"
                    placeholder="Title"
                    name="title"
                    value={this.state.formInputs.title}
                    onChange={this.handleChange}
                  />
               <span className="input-hint">{this.state.errors.title}</span>
             </div>
             <div className={classnames("form-group col-md-4" , {error : !!this.state.errors.periode})}>
                  <label htmlFor="">Periode</label>

             <select className="browser-default custom-select" name="periode" onChange={this.handleChange}>
               <option value="4">4h</option>
               <option value="8">8h</option>
               <option value="12">12h</option>
             </select>
             
                  <span className="input-hint">{this.state.errors.periode}</span>
                </div>
                <div className={classnames("form-group col-md-4" , {error : !!this.state.errors.supplier})}>
                  <label htmlFor="">Fournisseur</label>

                  <Select defaultValue={this.displaySelectedSupplier()} options={this.displaySuppliers()} name='supplier' onChange={this.handleSupplier} className="basic-multi-select" classNamePrefix="select" />
             
                  <span className="input-hint">{this.state.errors.supplier}</span>
                </div>
            </div>
           <div className="form-row">
                <div className={classnames("form-group col-md-4" , {error : !!this.state.errors.type})}>
                  <label htmlFor="">Type</label>
                   <select className="browser-default custom-select" name="type" onChange={this.handleChange} value={this.displaySelectedType()} >
                 <option value="curative">Curative</option>
                     <option value="preventive">Préventive</option>
                     
                 </select>
                  <span className="input-hint">{this.state.errors.type}</span>
                </div>
                <div className={classnames("form-group col-md-4" ,{error : !!this.state.errors.site} )}>
                <label >Site</label>
                <Select options={this.displaySites()} defaultValue={this.displaySelectedSite()}  name='site' onChange={this.handleSite} className="basic-multi-select" classNamePrefix="select"  />
                  <span className="input-hint"></span>
                </div>
                <div className={classnames("form-group col-md-4" ,{error : !!this.state.errors.site} )}>
                <label >Equipement</label>
                <Select options={this.displayEquipements()} name='equipement'onChange={this.handleEquipement} className="basic-multi-select" classNamePrefix="select" defaultValue={this.displaySelectedEquipement()}  />
                  <span className="input-hint"></span>
                </div>
              
              </div>

              <div className="form-row">
             
                <div className={classnames("form-group col-md-12" , {error : !!this.state.errors.agents} )}>
                <label >Agents</label>
                <Select options={this.displayAgents()} defaultValue={this.displaySelectedAgents()}   name='agents'  className="basic-multi-select" classNamePrefix="select" onChange={this.handleAgents}  isMulti />
                  <span className="input-hint">{this.state.errors.agents}</span>
                </div>
              </div>

              <div className="form-row">
             
                <div className={classnames("form-group col-md-12" , {error : !!this.state.errors.failures} )}>
                <label >Pannes</label>
                <Select options={this.displayFailures()} name='failures' className="basic-multi-select" classNamePrefix="select" onChange={this.handleFailures} defaultValue={this.displaySelectedFailures()}   isMulti />
   
                  <span className="input-hint">{this.state.errors.failures}</span>
                </div>
              </div>

<div className="form-row">
             
             <div className={classnames("form-group col-md-12" , {error : !!this.state.errors.description} )}>
             <label >Description</label>
             <textarea
                    type="description" 
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    value={this.state.formInputs.description}
                    onChange={this.handleChange}
                  />
               <span className="input-hint">{this.state.errors.description}</span>
             </div>
            </div>
          
{this.displayObservation()}
{this.displayButtons()}
              
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
    suppliers: state.suppliers,
    agents: state.agents,
    failures: state.failures
  }
}

export default connect(mapStateToProps,{getEquipements,getSites,getSuppliers,getAgents,getFailures,addIntervention,completeIntervention,deleteInterventionById,updateIntervention} )(InterventionForm);
