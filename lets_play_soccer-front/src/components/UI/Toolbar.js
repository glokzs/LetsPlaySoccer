import React, {Component, Fragment} from 'react';
import photo from '../../assets/content_images/Mask.png';
import {Nav, NavItem} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import Footer from '../Footer';
import { Drawer } from 'antd';

class Toolbar extends Component {
  state = {
    isMenuOpen: false
  };
  
  menuToggle = () => {
    this.setState({isMenuOpen: !this.state.isMenuOpen});
  };
    render() {
      return (
        <Fragment>
          <div className='toolbar'>
            <button
              className='toolbar__btn icon--hamburger'
              onClick={this.menuToggle}
            />
          </div>
          <Drawer
            closable={false}
            onClose={this.menuToggle}
            visible={this.state.isMenuOpen}
            placement={'left'}
          >
            <div>
              <div className="toolbar__sidebar">
                <div className="profile">
                  <img className="photo-profile" src={photo} alt='' width={84}/>
                  <h2 className='toolbar__name'>{this.props.user.displayName}</h2>
                  <span className='toolbar__trust'>
                    Доверие: <span className='toolbar__trust__value'>100%</span>
                  </span>
                </div>
                <Nav>
                  <NavItem className="menu-item" ><NavLink className="menu-link" to="/matches/completed" >Завершённые матчи</NavLink></NavItem>
                  <NavItem className="menu-item" ><NavLink className="menu-link" to={"/profile?id="/*+props.user._id*/} >Профиль</NavLink></NavItem>
                  <NavItem className="menu-item" >
                    <NavLink className="menu-link" to={"/messages?id="/*+props.user._id*/} >Уведомления</NavLink>
                    <div className="toolbar__messages">У вас {'5'} уведомлений </div>
                  </NavItem>
                </Nav>
                <div>
                  <NavItem className="menu-item" >
                    <button
                      className="menu-btn"
                      onClick={() => {
                        this.props.logout();
                      }}
                  >
                    Logout
                  </button> </NavItem>
                  <Footer />
                </div>
              </div>
            </div>
          </Drawer>
        </Fragment>
      );
    }
}

export default Toolbar;
