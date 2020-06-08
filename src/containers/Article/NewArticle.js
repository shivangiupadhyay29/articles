import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ArticleForm from '../../components/ArticleForm';
import {useSelector, useDispatch} from 'react-redux';
import action from '../../redux';
import { useNavigate, Outlet, useParams, useLocation } from 'react-router-dom';


 function NewArticle() {
     const error = useSelector(state => state.article.error);
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const { pathname } = useLocation();
     const { articleSlug = pathname.split('editor/')?.[1] || null  }= useParams();
     const { addArticles } = action.article;
     const [ formValue, setFormValue ] = useState({
        title:'', description:'', body:'', tag:'', tagList:[]
     });

     const successfulHandler = (article) => navigate(`/article/${article.slug}`);

     const submit = (evt) => {
        evt.preventDefault();
        dispatch(addArticles(formValue, successfulHandler));
     }

     const onChangeHandler = (event) => {
            const { target:{ name, value } } = event;
            setFormValue(current => ({...current, [name]: value }));
     }

     const addTag = (event) => {
        if(event.key === 'Enter'){
            console.log('enter press here! ');
            let {tagList, tag} = formValue;
            tagList.push(tag);
            tag='';
            setFormValue(current => ({...current, tagList, tag }));
            event.preventDefault();
          }
        
     }

     const removeTag = (tag) => () => {
        const { tagList } = formValue;
        let index = tagList.indexOf(tag);
        tagList.splice(index,1);
        setFormValue(current => ({...current,tagList }));
     }
    return !articleSlug ? (<Container>
            <Row className={'justify-content-md-center'}>
                        <Col md={10} xs={12} lg={8}>
                                    <ArticleForm 
                                        error={error}
                                        formValue={formValue}
                                        onChangeHandler={onChangeHandler}
                                        submit={submit}
                                        removeTag={removeTag}
                                        addTag={addTag}
                                    / >
                         </Col>
            </Row>
    </Container>):
    <Outlet />
}

export default NewArticle;