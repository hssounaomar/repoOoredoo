import React, { Component } from 'react';
import {getSites,deleteSiteById} from '../actions/sitesActions';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Site from './Site'
import SiteForm from './SiteForm';
import ModalDialog from './ModalDialog';
class Sites extends Component {
    state ={
        sites:[],
        modal:false,
        form:false,
        action:null,
        titleForm:'',
        deletedSite:null,
        selectedType:'Batiment'
    }
    componentDidMount() {
        this.props.getSites();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.sites){
            this.setState({
                sites:nextProps.sites
            })
        }
    }
    handleChange =(event)=>{
        const {name,value}=event.target;
        this.setState({
            selectedType:value
        })
    }
    toggleForm = (identifier,titleForm) => {
        identifier
        ?
        this.setState({ identifier,titleForm, form: !this.state.form })
        :
        this.setState({ form: !this.state.form })
    }
    toggleModal = () => {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
    setDeletedSite=(deletedSite)=>{
        this.setState({
            deletedSite
        })
    }
      deleteSite =()=>{
this.props.deleteSiteById(this.state.deletedSite);
      }
      addSite = (e) => {
        this.setState({ titleForm: 'Ajouter' }, () => {
          this.toggleForm();
        })
      }  
displaySites =()=>{
    if(this.state.sites){
       return this.props.sites.filter((item)=>item.type===this.state.selectedType).map(site=>{
return (
    <Site site={site} key={site._id} setDeletedSite={this.setDeletedSite} toggleForm={this.toggleForm}   toggle={this.toggleModal} ></Site>
)
        })
    }
    return null;
}

    render(){
      
        return(
            <div className="equipements">
                <div className="container">
                <div className="filter-bar">
        <div className="stickies">
        <div className="site-filter">
       <div className="radio-field btn">
    <input type="radio" id="MSC" name="choice" checked={this.state.selectedType==='MSC'} value='MSC' onChange={this.handleChange}/> 
    <label htmlFor="MSC">MSC</label>
    
</div>
<div className="radio-field btn">
    <input type="radio" id="DSC" name="choice" checked={this.state.selectedType==='DSC'} value='DSC' onChange={this.handleChange} /> 
    <label htmlFor="DSC">DSC</label>
    
</div>
<div className="radio-field btn">
    <input type="radio" id="Depot" name="choice" checked={this.state.selectedType==='Depot'} value='Depot' onChange={this.handleChange}/> 
    <label htmlFor="Depot">Depot</label>
    
</div>
<div className="radio-field btn">
    <input type="radio" id="Batiment" name="choice"  value='Batiment' checked={this.state.selectedType==='Batiment'} onChange={this.handleChange}/> 
    <label htmlFor="Batiment">Batiment</label>
    
</div>
       </div>
        </div>
        <div className="filter-bar-right">
       
        <button className="new-equipement btn" onClick={this.addSite}>Nouveau Site</button>
        <SiteForm site={this.state.identifier} form={this.state.form} toggleForm={this.toggleForm} titleForm={this.state.titleForm}></SiteForm>
        <ModalDialog toggle={this.toggleModal} modal={this.state.modal} delete={this.deleteSite}/>
  
        </div>
      </div>
                    <div className="items">
         {this.displaySites()}
         </div>
         </div>
         </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sites: state.sites
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getSites,deleteSiteById }, dispatch)
}    

export default connect(mapStateToProps,mapDispatchToProps)(Sites)
