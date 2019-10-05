import React, { Component } from 'react'
import EquipementForm from './EquipementForm';

export class FilterBar extends Component {
  render() {
    return (
      <div className="col-md-12">
      <div className="filter-bar">
        <div className="stickies">
            <span className="sticky btn">all<button>&times;</button></span>
            <span className="sticky btn">{this.props.site}<button>&times;</button></span>
        </div>
        <div className="filter-bar-right">
          <EquipementForm ></EquipementForm>
          <button className="filter-btn" onClick={ ()=> this.props.toggleFilter()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
          </button>
        </div>
      </div>
      </div>
    )
  }
}

export default FilterBar



