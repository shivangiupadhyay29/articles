import React from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'react-bootstrap';
import { notFoundPage } from '../../constants';


const NotFound = ({title,message}) => {
    return (
        <Container>
                <Row>
                    <Col md={12} xs={12} lg={12} className={''}>
                     <div>
                        <h1 className={'d-block'} style={{textAlign:'center'}}>{title} </h1> 
                        <p className={'d-block'} style={{textAlign:'center'}}>{message}</p> 
                     </div>
                    </Col>
                </Row>
        </Container>

    )
}

NotFound.defaultProps = {
    title: notFoundPage.title,
    message: notFoundPage.message
}

NotFound.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
}

export default NotFound