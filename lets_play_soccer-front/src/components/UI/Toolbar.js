import React, {Component, Fragment} from 'react';
import photo from '../../assets/content_images/Mask.png';
import {Nav, NavItem} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import Footer from '../Footer';
import {Drawer} from 'antd';
import config from '../../config';


class Toolbar extends Component {
  state = {
    isMenuOpen: false
  };
  
  menuToggle = () => {
    this.setState({isMenuOpen: !this.state.isMenuOpen});
  };
    render() {
      let img;
      if(this.props.user.avatar) {
        img = config.publicUserFolder  + this.props.user.avatar;
      } else {
        img = photo;
      }
      return (
        <Fragment>
          {
            (this.props.match.path === "/my/profile/:id") ?
            <div className='toolbar box-shadow-none'>
              <button
                className='toolbar__btn icon--hamburger'
                onClick={this.menuToggle}
              />

            </div>
                :
            <header className='toolbar__header'>
              <div className='col-3'>
                <button
                    className='toolbar__btn icon--hamburger'
                    onClick={this.menuToggle}
                />
              </div>
              <div className='col-6 toolbar__header__title'>Матчи</div>
              <div className='col-3 text-right'>
                <div
                    className='toolbar__btn--add icon--plus'
                    onClick={() => this.props.history.push('/my/matches/create')}
                />
              </div>
            </header>
          }

          <Drawer
            closable={false}
            onClose={this.menuToggle}
            visible={this.state.isMenuOpen}
            placement={'left'}
          >
            <div>
              <div className="toolbar__sidebar">
                <div className="profile">
                  <img className="photo-profile" src={img} alt='' width={84}/>
                  <h2 className='toolbar__name'>{this.props.user.displayName}</h2>
                </div>
                <Nav>
                  <NavItem className="menu-item" ><NavLink className="menu-link" to="/my/matches/completed" >Завершённые матчи</NavLink></NavItem>
                  <NavItem className="menu-item" ><NavLink className="menu-link" to={"/my/profile/" + this.props.user.id} >Профиль</NavLink></NavItem>
                </Nav>
                <div>
                  <NavItem className="menu-item" >
                    <button
                      className="menu-btn"
                      onClick={() => {
                        this.props.onLogoutUser();
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
