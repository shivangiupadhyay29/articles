import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { readMore } from '../../constants';
import Tags from '../Tags';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

 const Item = ({ title,description, tagList, slug } ) => {
    const  navigate  = useNavigate();

    const tagsClickHandler = (event) => {
        event.preventDefault();
        navigate(`/article/${slug}`);
    }

    return(
        <Container style={{display:'inline-flex' , marginTop: 2+'rem'}} >
        <Col className={'pull-left'}>
            <a href={`/article/${ slug }`} className={'article-preview'}>
                    <h1 className={'title-article'}>{title}</h1>
                    <p className={'description'}>{description}</p>
                    <span className={'readmore'}>{readMore}</span>
            </a>
        </Col>
        <Col className={'pull-right'}>
                    <div className={'pull-right'} style={{cursor:'pointer'}}>
                        <Tags tagList={tagList}  click={tagsClickHandler}/>
                    </div>
        </Col>
    </Container>
    )
}

Item.defaultProps = {
    title:'',
    description:'', 
    tagList:[], 
    slug:''
}

Item.propTypes = {
    title: PropTypes.string.isRequired,
    description:PropTypes.string.isRequired,
    tagList:PropTypes.array.isRequired,
    slug:PropTypes.string.isRequired
}

export default  Item;