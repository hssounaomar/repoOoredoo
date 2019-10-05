import React,{Component} from 'react'
import FabMenu from './FabMenu';

class user extends Component{
        render(){
            return( 
                <div className="col-md-3 col-sm-4 col-xs-12">
                <div className="equipement card">
                    <FabMenu object={this.props.user} toggleForm={this.props.toggleForm} toggle={this.props.toggle} setDeletedObject={this.props.setDeletedUser} />
         
            
                
                <h5 className="card-title">{this.props.user.firstName}</h5>
                <p className="card-description">{this.props.user.lastName}</p>
                <p className="card-description">{this.props.user.role}</p>
              
            
  </div> </div> )
        }
}
export default user;