import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import action from '../../redux';
import AuthorHeader from '../../components/AuthorHeader';
import './index.css';
import Comment from '../Comment';
import Tags from '../../components/Tags';
import {getToken} from '../../utils';


 function ViewArticle() {
    const {article:{ getArticle, toggleFavorite, toggleFollowing, deleteArticle } } = action;
    const { articleSlug  }  = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = getToken();

    const article = useSelector(state => state.article.currentArticle);
    const user = useSelector(state => state.login.user);
    const { title, body, tagList, favorited,createdAt,author: { image, username:authorUsername, following } = {} } = article || {};

    const [ follow, setFollow  ] = useState(following);
    const [ favorite, setFavorite  ] = useState(favorited);

    const successArticleHandler = article => console.log('article', article);

    useEffect(() => {
        dispatch(getArticle(articleSlug, successArticleHandler));
    },[articleSlug]);

    const followingHandler = () => { 
                setFollow(current => !current);
                dispatch(getArticle(articleSlug, successArticleHandler)); 
    }

    const favoriteHandler = () => setFavorite(current => !current);

    const toggleFavoriteArticle = (event) => {
        event.preventDefault();
        if(!token){
            navigate('/login');
        } else{
        const { author:{ username, following } = {}, favorited} = article || {};
        dispatch(toggleFavorite({ articleSlug, toggleValue:!favorited },favoriteHandler))
    }
};
    const toggleFollowingAuthor= (event) => {
        event.preventDefault();
        if(!token){
            navigate('/login');
        } else{
        const { author:{ username, following } = {}} = article || {};
        dispatch(toggleFollowing({ username, toggleValue: !following },followingHandler));
    }
}

    const deleteHandler = () => navigate('/');
    
    const deleteArticleHandler = (event) => {
        event.preventDefault();
        if(!token){
            navigate('/login');
        } else{
        dispatch(deleteArticle(articleSlug, deleteHandler));
    }
}

    const editArticle = (event) =>{
        event.preventDefault();
        if(!token){
            navigate('/login');
        } else{
        navigate(`/editor/${articleSlug}`,{ state:{ article }, replace: false });
    }
}
    
    return <Container fluid style={{ width:100+'%' }}>
                <Row className={'headerView'}>
                        <Container> 
                            <h1>{title}</h1>
                            <Row>
                                <AuthorHeader 
                                    user={user}
                                    article={article}
                                    toggleFavoriteArticle={toggleFavoriteArticle}
                                    toggleFollowingAuthor={toggleFollowingAuthor}
                                    deleteArticle={deleteArticleHandler}
                                    editArticle={editArticle}
                                />
                            </Row>
                        </Container>
                </Row>
                
                <Row>
                    <Col> 
                    <Container> 
                            <Row className={'articleBody'}>
                                    <div><p className={'description'}>{body}</p></div>
                                    {tagList && <Tags tagList={tagList} />}
                            </Row>
                        </Container>
                    </Col>
                </Row>
                
                <Row>
                    <Col> 
                        <Container style={{textAlign:'center', marginTop:2+'%'}}> 
                            <AuthorHeader 
                                user={user}
                                article={article}
                                style={{  link:{color:'green'} }}
                                toggleFavoriteArticle={toggleFavoriteArticle}
                                toggleFollowingAuthor={toggleFollowingAuthor}
                                deleteArticle={deleteArticleHandler}
                                editArticle={editArticle}
                            />
                        </Container>
                    </Col>
                </Row>
                                
                {
                    token?<Comment
                        authorUsername={authorUsername}
                        createdAt={createdAt}
                    />:
                    <p style={{textAlign:'center', margin:2+'rem'}}> 
                        <a href={'/login'}>Sign in</a> or <a href={'/register'}>Sign up </a> to add comments on this article.  
                    </p>
                }
</Container>
}

export default ViewArticle;