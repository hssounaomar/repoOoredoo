import React, { Component } from 'react'
import { Collapse } from 'reactstrap';
import {getSites} from '../actions/sitesActions';
import {getSitesTypes} from '../actions/siteTypesActions';
import {getCategories} from '../actions/categoriesActions';
import {getEquipementsTypes} from '../actions/equipementTypesActions';
import { connect } from "react-redux";
import Select from 'react-select'
import { bindActionCreators } from 'redux'
const Categorie =(props)=>{
     return(<div className="form-check" key={props.categorie._id}>
     <input className="form-check-input"  type="radio"  name="exampleRadios" onClick={props.handleCategorie} value={props.categorie._id} />
     <label className="form-check-label" >
       {props.categorie.name}
     </label>
   </div>)
}
class Filter extends Component {
    state = { 
        collapse: {
            'SITE_COLLAPSE' : true,
            'CATEGORY_COLLAPSE' : true,
            'TYPE_COLLAPSE' : true
        },
        categorie:null,
            siteType:null,
            type:null
    };
displayCategories =()=>{
    return this.props.categories.map(categorie=>{

  return(<Categorie key={categorie._id} categorie={categorie} handleCategorie={this.handleCategorie} />)

    })
}

    displaySites =()=>{
        //display Sites inside search box
      if(this.props.sites)
        return this.props.sites.filter(site=>{return site.type===this.state.siteType}).map(site=>{return  { value: site._id, label: site.name } ;})
        else
        return [];
      }
      displayTypes =()=>{
        //display Sites inside search box
      if(this.props.equipementsTypes)
        return this.props.equipementsTypes.filter(type=>{return type.category._id===this.state.categorie}).map(type=>{return  { value: type._id, label: type.name } ;})
        else
        return [];
      }
    handleTypeSite =(e)=>{
        this.setState({siteType:e.target.value})
    }
    handleCategorie =(e)=>{
        this.setState({categorie:e.target.value})
    }
    componentWillMount(){
        this.props.getSites();
        this.props.getCategories();
        this.props.getEquipementsTypes();

    }
    toggle = (type) => {
        this.setState({collapse: {...this.state.collapse, [type]: !this.state.collapse[type]}})

    }
 
    toggleClass =()=>{
        this.setState(prev=>({
showSites:!prev.showSites
        }))
    }
    render() {
    console.log(this.props.sites)
    return (
        <div className={`filter ${this.props.filterClass}`} >
            
            <div className="filter-header">
                <span className="filter-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
                </span>
                <span>Filtres</span>
            </div>
            <button className="close-btn" onClick={this.props.toggleFilter}>&times;</button>
        

            <div className="filter-item">
                <h6 className="filter-title" onClick={() => this.toggle('SITE_COLLAPSE')}>Sites</h6>
                <Collapse className="collapse-content" isOpen={this.state.collapse['SITE_COLLAPSE']}>

              <form>
              <div className="form-check" >
                <input className="form-check-input"  type="radio"  name="exampleRadios" onClick={this.handleTypeSite} value="DSC" />
                <label className="form-check-label" >
                  DSC
                </label>
              </div>
              <div className="form-check" >
                <input className="form-check-input"  type="radio" onClick={this.handleTypeSite} name="exampleRadios"value="MSC" />
                <label className="form-check-label" >
                  MSC
                </label>
              </div>
              <div className="form-check" >
                <input className="form-check-input"  type="radio" onClick={this.handleTypeSite}  name="exampleRadios"value="Depot" />
                <label className="form-check-label" >
                  Depot
                </label>
              </div>
              <div className="form-check" >
                <input className="form-check-input"  type="radio" onClick={this.handleTypeSite}  name="exampleRadios"value="Batiment" />
                <label className="form-check-label" >
                  Batiment
                </label>
              </div>
       
                      
                 
               
                   <Select options={this.displaySites()} name='site' onChange={e=>this.props.filterBySite(e)} className="basic-multi-select" classNamePrefix="select"   />


                
                   </form>

                </Collapse>
            </div>

            <div className="filter-item">
                <h6 className="filter-title" onClick={() => this.toggle('CATEGORY_COLLAPSE')}>Categories</h6>
                <Collapse className="collapse-content"  isOpen={this.state.collapse['CATEGORY_COLLAPSE']}>
                 {this.displayCategories()}
                 <Select options={this.displayTypes()} name='site' onChange={e=>this.props.filterByType(e)} className="basic-multi-select" classNamePrefix="select"   />
                </Collapse>
            </div>

          
        </div> 
    )
    }
}

function mapStateToProps(state) {
    return { sites:state.sites,equipementsTypes:state.equipementsTypes,categories:state.categories };
  }
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getSites,getSitesTypes,getCategories,getEquipementsTypes }, dispatch)
}
  export default connect(mapStateToProps,mapDispatchToProps)(Filter); 