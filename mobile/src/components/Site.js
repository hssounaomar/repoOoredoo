import React from 'react'

const Site =(props)=>(
          <div className="site card col-md-3 col-sm-4 col-xs-12">
                {/* <div className="equipement-inner">
                    <div className="equipement-hover-info">
                        <ul className="equipement-action">
                            <li><a onClick={() => props.setActiveItem(props)} data-toggle="modal" data-target="#equipementModal" title="Quick View" className="quick-view modal-view detail-link"  href="#none"><span className="ti-more-alt"></span></a></li>
                        </ul>
                    </div>
                </div> */}
                
                    
                    <h5 className="card-title">{props.site.name}</h5>
                    <p className="card-description">{props.site.address}</p>
                    <p className="card-description">{props.site.floorsNumber}</p>
                    {/* <p className="card-description">{props.site.responsibleName}</p>
                    <p className="card-description">{props.site.responsibleNumber}</p> */}
                    {/* <p className={`equipement-state ${setStateColor(props.site.state)}`}>{props.equipement.state}</p> */}
                
      </div>
);
export default Site;