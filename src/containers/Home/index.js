import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../../redux';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { yourFeed, globalFeed } from '../../constants';
import ArticleList  from '../../components/ArticleList';
import {  useParams, useNavigate  } from 'react-router-dom';
import { getNumberOfTabs } from '../../utils';
import TagsList from '../Tags';
import { getToken }   from '../../utils';
import './index.css';


 function Home() {
  const dispatch = useDispatch();
  const token = getToken(); 
  let navigate =  useNavigate();
  const articles = useSelector(state => state.article.articles); 
  const limit = useSelector(state => state.article.globalLimit);   
  const { getArticles, toggleFavorite  } = actions.article;

  const loading = useSelector(state => state.article.loading);
  const offset = useSelector(state => state.article.offset);
  const articlesCount = useSelector(state => state.article.articlesCount);
  const [ tag, setTag] = useState(null);

  const articlesCall = (offset, isFeed, resetTagState, tagFilter ) => (event) =>  {
     if(event){
            event.preventDefault(); 
            
      }
    
     if(resetTagState)
     setTag(null);
     
     const params = (tagFilter || tag) ?{ isFeed, limit: limit, offset: offset || 0, tag:tagFilter || tag }
    :{ isFeed, limit: limit, offset: offset || 0 };
    
    dispatch(getArticles(params));
  }

  useEffect(() => {
      if(token){
         dispatch(getArticles({ isFeed:true, limit: limit, offset: offset || 0 }));
      }
      else {
            articlesCall(offset,false,true)();
      }
},[]);

const afterFavroiteHandler = () => console.info('');

const favoriteHandler = (slug, toggleValue) => () => {
      if(!token){
            navigate('/login');
      }
    else 
    dispatch(toggleFavorite({ articleSlug:slug, toggleValue }, afterFavroiteHandler));
}

const tagsClicked = (tag) => (event) => {
  event.preventDefault();
  setTag( tag );
  dispatch(getArticles({ isFeed:false, limit: limit, offset: 0, tag }));
}



  return  <Container>
        {!token && <Row>
            <Container style={{textAlign:'center',marginBottom: 1+'rem'}}>
                        <div className={'logo-header'} >
                              <h1 className={'logo'}>{'conduit'}</h1>
                              <p className={'logo-description'}>{'A place to share your knowledge.'}</p>
                        </div>
            </Container>
      </Row>}
    <Row>
        <Col>
                <div>
                          <Navbar fill={'true'} variant="tabs" defaultActiveKey={`/`}>
                              <Nav className="mr-auto">
                                    {token && 
                                    <Nav.Item>
                                          <Nav.Link  style={{cursor:'pointer'}} href={`/`} onClick={articlesCall(offset,true,true)}>{yourFeed}</Nav.Link>
                                     </Nav.Item>}
                                    <Nav.Item>
                                          <Nav.Link  style={{cursor:'pointer'}} href={`/`} onClick={articlesCall(offset,false,true)}>{globalFeed}</Nav.Link>
                                    </Nav.Item>
                                    { tag && <Nav.Item>
                                          <Nav.Link style={{cursor:'pointer'}} href={`/`} onClick={articlesCall(offset,false,false,tag)}>{`#${tag}`}</Nav.Link>
                                    </Nav.Item>}
                              </Nav>
                          </Navbar>
                        <div>
                          {     
                                    articles.length > 0 &&
                                     <> 
                                              <ArticleList 
                                                    articles={articles}  
                                                    paginationTabCount={getNumberOfTabs(articlesCount,limit)}
                                                    nextTabClickHandler={articlesCall}
                                                    offset={offset}
                                                    limit={limit}
                                                    favoriteHandler={favoriteHandler} 
                                                    paginationVisible={limit >= articlesCount?false:true}
                                                    loading={loading}
                                              />  
                                    </>
                            }
                            {
                                  loading && articles.length === 0 && <h6>{'Loading......'}</h6>
                            }
                            {
                                 !loading && articles.length === 0 && <h6>{'Not articles yet......'}</h6>
                            }
                         </div>
              </div>
        </Col>
        <Col  xs lg="2">
              <Row  className={'pull-right'}>
                      <div style={{
                        paddingTop: 20+'px',
                        paddingRight: 20+'px',
                        paddingBottom: 20+'px', 
                        paddingLeft: 20+'px', 
                        background: '#f3f3f3',
                        borderRadius: 4+'px'
                      }}>
                        <h5>{'Popular Tags'}</h5>
                            <TagsList click={tagsClicked}/>
                       </div>
              </Row>
          </Col>
    </Row>
</Container>
}

export default Home;
  