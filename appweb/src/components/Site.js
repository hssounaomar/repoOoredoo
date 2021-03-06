import React,{Component} from 'react'
import FabMenu from './FabMenu';

class Site extends Component{
        render(){
            return( 
                <div className="col-md-3 col-sm-4 col-xs-12">
                <div className="equipement card">
                    <FabMenu object={this.props.site} toggleForm={this.props.toggleForm}  toggle={this.props.toggle} setDeletedObject={this.props.setDeletedSite} />
         
            
                
                <h5 className="card-title">{this.props.site.name}</h5>
                <p className="card-description">{this.props.site.address}</p>
                <p className="card-description">{this.props.site.floorsNumber}</p>
              
            
  </div> </div> )
        }
}
export default Site;