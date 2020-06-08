import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {  NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { generateNavLinksOptions } from '../../utils';
import { loginAlt } from '../../constants';
// import { Container, Row, Col } from 'react-bootstrap';


import './index.css';

//hocs
import hoc from '../../hocs';

const { withDocTitle } = hoc;

 function Header(props){
    const { headerTitle } = props;
    const user = useSelector(state => state.login.user);
    const [navOption, setNavOption ] = useState(generateNavLinksOptions(user));

    useEffect(() => {
        let navs = user ? generateNavLinksOptions(user): generateNavLinksOptions();
        setNavOption(navs);
    },[user]);

    const getIconsOrImages = (element) => element.icon ? 
     <i className={`${element.icon} icon`} aria-hidden="true"></i> : 
     element.image?<img src={element.image} alt={loginAlt} />:null;

    return (
        <Container fluid style={{ paddingTop:0.5+'rem', paddingRight: 1+'rem',
         paddingBottom:0.5+'rem', paddingLeft:1+'rem',margin: 1.0+'rem', width: 100+'%' }} >
        <Row>
            <Container>
                <Row style={{ paddingTop:0.5+'rem'}}>
                    <Col>
                         <a  className="navbar-brand pull-left" href='/'>{headerTitle}</a>
                    </Col>

                    <Col> 
                        <ul className="nav justify-content-end pull-right" >
                                                <li className="nav-item">
                                                    {navOption.map(element =>
                                                        <NavLink to={element.path} key={element.name} className="link active" activeStyle={{ color: 'black' }} >
                                                            {getIconsOrImages(element)}
                                                            {element.name}
                                                        </NavLink> 
                                                    )}
                                    </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    )
}


Header.propTypes = {
    headerTitle: PropTypes.string.isRequired,
}

Header.defaultProps = {
  headerTitle:'conduit',
}

export default withDocTitle(Header);