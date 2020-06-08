import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AuthorLink from '../FormHelpers/authorLink';
import { alt } from '../../constants';
import Item from './listItem';
import Paginantion  from '../Pagination';
import './index.css';

const ArticleList = ({ loading, articles, paginationVisible, favoriteHandler, paginationTabCount, offset, limit, nextTabClickHandler }) => {
const list = () => articles && articles.map((article) => {
    const { slug, title, description, author: {username: authorUsername, image }, createdAt, favoritesCount = '3', favorited, tagList = []} = article;
   
    return (<div className={'article-border'} style={{width:100+'%'}} key={slug}>
                <div>
                        <Container style={{display:'inline-flex' }} >
                                 <Col className={'pull-left'} style={{display:'inline-flex'}}>
                                     <Row style={{display:'inline-flex'}}>
                                            <a href={`/@${ authorUsername }`} style={{ paddingRight:0.5+'rem', paddingLeft:0.5+'rem' }}>
                                                <img src={image} alt={alt} style={{ height: 26+'px',borderRadius: 50+'px',
                                                marginTop: 0.8+'rem',marginRight:0,marginBottom:0,marginLeft:0.8+'rem',cursor:'pointer'}} />
                                            </a>
                                            <AuthorLink 
                                                authorUsername={authorUsername}
                                                createdAt={createdAt}
                                                link={true}
                                            />
                                    </Row>
                                  </Col>
                                <Col className={'pull-right'}>
                                        <Button variant="outline-success" className={`pull-right ${ favorited ? 'favorite':''}`} onClick={favoriteHandler(slug,!favorited)}>
                                            <i className={'fa fa-heart'} />{` ${favoritesCount}`}
                                        </Button>
                                 </Col>
                        </Container>
                       <Item 
                           slug={slug}
                           title={title}
                           description={description}
                           tagList={tagList}
                       />
                </div>
      </div>)
  })

return (
    <Container>
             <Row>
                 { list() }
             </Row>
             {paginationVisible && <Row>
                            <Paginantion  
                                paginationTabCount={paginationTabCount}
                                offset={offset}
                                limit={limit}
                                nextTabClickHandler={nextTabClickHandler}
                                loading={loading}
                                />
             </Row>}
    </Container>
)

}


ArticleList.propType = {
    article: PropTypes.object.isRequired
}

ArticleList.defaultProps = {
    article: {}
}

export default ArticleList;