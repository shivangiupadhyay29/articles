import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import action from '../../redux';
import {getToken} from '../../utils';
import CommentForm from '../../components/CommentForm';



export default ({authorUsername, createdAt}) => {
    const {comment:{ getComments, addComment:addCommentAction, deleteComment:deleteCommentAction } } = action;
    const { articleSlug  }  = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ body, setBody ] = useState({ body:'' });

    const user = useSelector(state => state.login.user);
    const comments = useSelector(state => state.comment.comments);
    const error = useSelector(state => state.comment.error);
    const loading = useSelector(state => state.comment.loading);

    const successCommentsHandler = comments => console.log('article', comments);

    const deleteHandler = () => (console.log('deleted !'));
    // dispatch(getComments(articleSlug, successCommentsHandler));
    // 
    // 

    const addCommentHandler = (event) => {
        setBody({ body:null });
    }

    const addComment = (event) => {
        event.preventDefault();
        if(getToken())
        dispatch(addCommentAction( { articleSlug ,body }, addCommentHandler));
        else 
        navigate('/login');
    }

    const deleteComment = (id) => (event) => {
        event.preventDefault();
        dispatch(deleteCommentAction({ articleSlug, id }, deleteHandler));
    }

    useEffect(() => {
        dispatch(getComments(articleSlug, successCommentsHandler));
    },[articleSlug]);

    const onChangeHandler = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        setBody(current => ({...current, [name]:value }));
    };

    return  (<Row>
                        <Col> 
                        <Container style={{marginBottom: 3+'rem'}}>
                                        <CommentForm 
                                                isCommentList={false}
                                                authorUsername={authorUsername}
                                                createdAt={createdAt}
                                                image={user?.image || ''}
                                                body={body} 
                                                addComment={addComment}
                                                onChangeHandler={onChangeHandler}
                                                error={error}
                                                loading={loading}
                                        />
                            </Container>
                        <Container style={{marginBottom: 3+'rem'}}>
                                    {comments && comments.map(comment =>{
                                    return <CommentForm 
                                                key={comment.id}
                                                isCommentList={true}
                                                comment={comment}
                                                deleteComment={deleteComment}
                                    /> })}
                        </Container>
                        </Col>
            </Row>)
}