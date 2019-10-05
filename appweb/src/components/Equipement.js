import React, { Component } from 'react'
import FabMenu from './FabMenu';

export class Equipement extends Component {
    render() {
        return (
            <div className="col-md-3 col-sm-4 col-xs-12">
            <div className="equipement card">
                <FabMenu object={this.props.equipement} toggleForm={this.props.toggleForm}  toggle={this.props.toggle} setDeletedObject={this.props.setDeletedEquipement} />
     
        
            
            <h5 className="card-title">{this.props.equipement.brand}</h5>
            {/* <p className="card-description">{this.props.site.address}</p>
            <p className="card-description">{this.props.site.floorsNumber}</p> */}
          
        
</div> </div>
        )
    }
}

export default Equipement
