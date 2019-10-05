import React, { Component } from 'react'
import classnames from 'classnames';

class FabMenu extends Component {

    state = {
        isOpen: false
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick);
    }

    toggleMenu = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    handleClick = (e) => {
        if(!this.actions.contains(e.target)) {
            this.setState({ isOpen: false })
        }
    }
deleteObject =()=>{
    //selected the deleted object from parent
    //identifier is the object that selected to delete
    this.props.setDeletedObject(this.props.object._id);
this.props.toggle();
}
    render() {
        return (
            <div ref ={node => this.actions = node } className={classnames("fab-menu", {'is-open': this.state.isOpen})}>
                <button className="launcher" onClick={this.toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                </button>
                <div className="actions">
                    <button className="action" onClick={ () => this.props.toggleForm(this.props.object,"Modifier") }>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon><line x1="3" y1="22" x2="21" y2="22"></line></svg>
                    </button>
                    <button className="action" onClick={this.deleteObject}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                </div>
            </div>
        )
    }
}

export default FabMenu;
