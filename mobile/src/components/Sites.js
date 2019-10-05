import React, { Component } from 'react'


import {getSites} from '../actions/sites.actions';
//import {getSitesTypes} from '../actions/siteTypes.actions';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Site from './Site'
import CategoryForm from './CategoryForm'
class Sites extends Component {
    state ={
        sites:[],
        modal:false
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
    toggleModal = () => {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
displaySites =()=>{
    if(this.state.sites){
       return this.state.sites.map(site=>{
return (
    <Site site={site} key={site._id}></Site>
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
           
        </div>
        <div className="filter-bar-right">
        <button className="new-equipement btn" onClick={this.addCategorie}>Nouveau Site</button>
        <CategoryForm    toggle={this.toggleModal} modal={this.state.modal}></CategoryForm>
        
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
    return bindActionCreators({ getSites }, dispatch)
}    

export default connect(mapStateToProps,mapDispatchToProps)(Sites)
