import React, { Component } from 'react'
import AuthService from './AuthService';
import { withRouter } from 'react-router-dom';
import {isAuthenticated} from '../actions/authentication'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
const Auth=new AuthService();
class ProfileSummary extends Component {
    state = {
        isOpen: false
    }

handleLogout=()=>
{
  Auth.logout()
  this.props.isAuthenticated()
  this.props.history.replace('/login');
}
    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    styleList = () => {
        return {
            display: this.state.isOpen ? "block" : "none" 
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick);
    }

    handleClick = (e) => {
        if( !this.list.contains(e.target) && !this.btn.contains(e.target)) {
            this.setState({ isOpen: false })
        }
    }

    render() {
      
        return (
            <div className="profile-summary">
                <div ref={node => this.btn = node} onClick={() => this.toggle()} className="avatar">{'OH'}</div>
                {/* <p className="user-name">{this.props.user.firstName}</p> */}
                <div className="options">
                    {/* <button ref={node => this.btn = node} onClick={() => this.toggle()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#949494" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                    </button> */}

                    <ul ref={node => this.list = node} className="list" style={ this.styleList() }>
                        <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" ><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            <a href="#none">profil</a>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/></svg>
                            <button onClick={this.handleLogout}>déconnexion</button>
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({isAuthenticated}, dispatch)
  } 



export default connect(null,mapDispatchToProps )(withRouter(ProfileSummary));  
