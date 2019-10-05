import React, { Component } from 'react'
import FabMenu from './FabMenu';

export class Equipement extends Component {

    setStateColor = (state) => {
        switch (state) {
            case 'en service':
                return 'state__active'
            case 'en panne':
                return 'state__inactive'
            case 'en rebut':
                return 'state__broken'
            default:
                return ''
        }
    }

    render() {
        /* console.log(this.props); */
        return (
            <div className="col-md-3 col-sm-4 col-xs-12">
                <div className="equipement card">
                    <FabMenu identifier={this.props.equipement._id} toggleForm={this.props.toggleForm} />
                    {/* <div className="equipement-inner">
                    <div className="equipement-hover-info">
                        <ul className="equipement-action">
                            <li><a onClick={() => this.props.setActiveItem(this.props)} data-toggle="modal" data-target="#equipementModal" title="Quick View" className="quick-view modal-view detail-link"  href="#none"><span className="ti-more-alt"></span></a></li>
                        </ul>
                    </div>
                </div> */}
                    <h5 className="card-title">
                        {this.props.equipement.brand} {this.props.equipement.model}
                    </h5>
                    <p className="card-description">{this.props.site ? this.props.site.name : this.props.equipement.site.name}</p>
                    <p className="card-description">{this.props.equipement.reference.toUpperCase()}</p>
                    {/* <p className={`equipement-state ${this.setStateColor(this.props.equipement.state)}`}>{this.props.equipement.state}</p> */}

                </div>
            </div>
        )
    }
}

export default Equipement
