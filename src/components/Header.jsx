import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './style.css'
import logo from '../images/logo.svg'
import profile from '../images/profile.svg'
class Header extends Component {
    render() {
        return (
            <div style={{backgroundColor:'#fff',boxShadow:'5px'}}>
                <Row className="menu-section">
                    <Col offset="1" span="3"><img className="logo" src={logo}  alt="logo" /><span className="company">Intugine</span></Col>
                    {/* <Col offset="16" span="4">
                        <div className="menus">
                            <span>Home</span>
                            <span>Brands</span>
                            <span>Transporters</span>
                        </div>
                    </Col> */}
                     <Col offset="15" span="1"><a href="#">Home</a></Col>
                     <Col  span="1"><a href="#">Brands</a></Col>
                     <Col  span="1"><a href="#">Transporters</a></Col>
                     <Col  span="1" ><img className="profile" src={profile} /></Col>

                </Row>
            </div>
        )
    }
}
export default Header;