import FabMenu from './FabMenu';
import React from 'react'

const Card = (props) => {
  return (
    <div className={`card ${props.className}`}>
        <FabMenu 
            id={props.id} 
            toggleForm={props.editAction} 
            deleteAction={props.deleteAction}
        />
        {props.children}
    </div>
  )
}

export default Card; 
