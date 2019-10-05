import React, { Component } from 'react'
/* import FilterBar from './FilterBar'; */
import Filter from './Filter';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { deleteEquipement,getEquipements } from '../actions/equipementsActions'
import { getSites } from '../actions/sitesActions';
import Equipement from './Equipement'
import EquipementForm from './EquipementForm'
import ModalDialog from './ModalDialog';
export class Equipements extends Component {

    state = {
        confirmationDialog: false,
        form: false,
        modal:false,
        showFilter: false,
        action:"",
        identifier:null,
        deletedEquipement:null,
        filter: {
            site: null,
            type: null
        }
    }
    toggleModal = () => {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
    deleteEquipement =()=>{
        this.props.deleteEquipement(this.state.deletedEquipement);
              }
    setDeletedEquipement=(deletedEquipement)=>{
        this.setState({
            deletedEquipement
        })
    }
    toggleForm = (identifier,titleForm) => {
        identifier
        ?
        this.setState({ identifier,titleForm, form: !this.state.form })
        :
        this.setState({ form: !this.state.form })
    }

    toggleConfirmationDialog = (id) => {
        this.setState({ confirmationDialog: !this.state.confirmationDialog, id: id || ''  })
    }
   
    componentDidMount() {
     
            this.props.getEquipements();
            this.props.getSites();
        
    }

    displayStickies = () => {
        if (this.state.filter.site || this.state.filter.type) {
            return Object.keys(this.state.filter).map( key  => {
                if (this.state.filter[key]) {
                    var span = (<span className="sticky btn" key={this.state.filter[key].value}>{this.state.filter[key].label}<button onClick={() => this.delelteSticky(key)}>&times;</button></span>)
                }
                return span
            })
        }
        return (<span className="sticky btn">all</span>)
    }

    toggleFilter = () => {
        this.setState({ showFilter: !this.state.showFilter })
    }

    getFilterStyle = () => {
        return this.state.showFilter ? 'is-open' : ''
    }

    filterBySite = (site) => {
        this.setState({
            filter: {
                ...this.state.filter,
                site
            }
        })
    }

    filterByType = (type) => {
        this.setState({
            filter: {
                ...this.state.filter,
                type
            }
        })
    }

    delelteSticky = (key) => {
        this.setState({
            filter: {
                ...this.state.filter,
                [key]: null
            }
        })
    }

    getEquipementSite = (id) => this.props.sites.find(site => site._id === id)

    displayEquipements = () => {
        let results = this.props.equipements;
        if (this.state.filter.site) {
            results = results.filter( equipement => 
                equipement.site._id === this.state.filter.site.value
            )
        }
        if (this.state.filter.type) {
            results = results.filter(equipement => 
               equipement.type === this.state.filter.type.value
            )
        }
        return results.map( equipement => 
            <Equipement
                setDeletedEquipement={this.setDeletedEquipement}
                key={equipement._id} 
                toggleForm={this.toggleForm}
                
                equipement={equipement}
                site={this.getEquipementSite(equipement.site)} 
                toggle={this.toggleModal}
            />
        )
    }

    render() {
        console.log(this.props.equipements)
        return (
            <div className="equipements">
                <div className="container">

                <ModalDialog toggle={this.toggleModal} modal={this.state.modal} delete={this.deleteEquipement}/>

                    <Filter 
                        filterClass={this.getFilterStyle()} 
                        filterBySite={this.filterBySite} 
                        filterByType={this.filterByType} 
                        delelteSite={this.delelteSite} 
                        toggleFilter={this.toggleFilter}
                    />

<EquipementForm equipement={this.state.identifier} form={this.state.form} toggleForm={this.toggleForm} titleForm={this.state.titleForm}></EquipementForm>
                    
                    <div className="col-md-12">
                        <div className="filter-bar">
                            <div className="stickies">
                                {this.displayStickies()}
                            </div>
                            <div className="filter-bar-right">
                                <button className="new-equipement btn" onClick={this.toggleForm}>Nouveau équipement</button>
                                <button className="filter-btn" onClick={() => this.toggleFilter()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24"><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="items">
                        {this.displayEquipements()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        equipements: state.equipements,
        sites: state.sites
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ 
    getEquipements, getSites, deleteEquipement
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Equipements)
