import React from 'react'
import Select from 'react-select'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {getSites} from '../actions/sites.actions';
class Equipe extends React.Component{
  componentDidMount() {
   
    this.props.getSites();

}
displaySites =()=>{
  //display equipements
if(this.props.sites)
  return this.props.sites.map(site=>{return  { value: site._id, label: site.name } ;})
  else
  return [];
}
handleSite =(e)=>{
  console.log(e)
}
  render(){
  return (
    <div className="container">
    <form>
    <label className="radio-inline">
      <input type="radio" name="optradio" checked/>Option 1
    </label>
    <label className="radio-inline">
      <input type="radio" name="optradio"/>Option 2
    </label>
    <label className="radio-inline">
      <input type="radio" name="optradio"/>Option 3
    </label>
  </form>
    <Select options={this.displaySites()} name='site' onChange={this.handleSite} className="basic-multi-select" classNamePrefix="select"  />
    </div>
  )
}}
const mapStateToProps = state => {
  return {
  
    sites: state.sites,
   
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({getSites}, dispatch)
}    
export default connect(mapStateToProps,mapDispatchToProps )(Equipe);

