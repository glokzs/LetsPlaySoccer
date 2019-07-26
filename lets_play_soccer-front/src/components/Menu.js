import React from 'react';
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from 'react-bootstrap';
import photo from '../uploads/Mask.png'
const Menu = props => {
    
    
    return (
        <div className="profile-container">
            <div className="profile">
                <img className="photo-profile" src={photo}/>
                <h2>{/*props.user.name*/}</h2>
                <spawn>{/*props.user.rating*/}</spawn>
            </div>
            <Nav>
                <NavItem className="menu-item" ><NavLink className="menu-link" to="/matchs" >Матчи</NavLink></NavItem>
                <NavItem className="menu-item" ><NavLink className="menu-link" to="/matchs/completed" >Завершённые матчи</NavLink></NavItem>
                <NavItem className="menu-item" ><NavLink className="menu-link" to={"/profile?id="/*+props.user._id*/} >Профиль</NavLink></NavItem>
                <NavItem className="menu-item" >
                    <NavLink className="menu-link" to={"/messages?id="/*+props.user._id*/} >Уведомления</NavLink>
                    <span className="messages">У вас {/* messages */} уведомлений </span>
                </NavItem>
                <NavItem className="menu-item" > <button className="menu-btn" >Logout</button> </NavItem>
            </Nav>
        </div>
    );
};

export default Menu;