import React from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import NotificationsBox from './NotificationsBox';
import ProfileSummary from './ProfileSummary';
class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar light expand="md">
          <div className="container">
            <NavbarBrand href="http://127.0.0.1">
              <img src="images/Logo.svg" className="logo" alt="logo" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar>

                <div className="dropdown nav-item">
                  <NavLink  to="/equipements">Equipements</NavLink>
                  <div className="dropdown-menu">
                    <li><NavLink to="/equipements/categories">Catégories</NavLink></li>
                    <li><NavLink to="/equipements/types">Types </NavLink></li>
                  </div>
                </div>

                <div className="dropdown nav-item">
                  <NavLink activeClassName="active" to="/sites">Sites</NavLink >
                 
                </div>

                <div className="dropdown nav-item">
                  <NavLink activeClassName="active" to="/interventions">Interventions</NavLink>
                  <div className="dropdown-menu">
                    <li><NavLink to="/interventions/pannes">Types des pannes</NavLink ></li>
                  </div>
                </div>
                
                <NavItem>
                  <NavLink activeClassName="active" to="/equipe">Equipe</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink activeClassName="active" to="/fournisseurs">Fournisseurs</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink activeClassName="active" to="/statistics">Statistics</NavLink>
                </NavItem>
              </Nav>
              <NotificationsBox/>
              <ProfileSummary  user={this.props.user} history={this.props.history}/>
            </Collapse>
          </div>
      </Navbar>
    );
  }
}

export default Header;