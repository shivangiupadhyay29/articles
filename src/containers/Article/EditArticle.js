import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ArticleForm from '../../components/ArticleForm';
import {useSelector, useDispatch} from 'react-redux';
import action from '../../redux';
import { useNavigate, Outlet, useParams } from 'react-router-dom';

function EditArticle() {
const {state}  = useLocation();
const dispatch = useDispatch();
const navigate = useNavigate();
const { articleSlug = null }= useParams();

const error = useSelector(state => state.article.error);
const article = useSelector(state => state.article.currentArticle);
const { editArticle, getArticle } = action.article;
const {title='', description='', body='', tag='', tagList=[] }  = article || {};
const [ formValue, setFormValue ] = useState({title, description, body, tag, tagList });

useEffect(() => { 
    dispatch(getArticle(articleSlug,() => console.log('get aricle!'))) 
},[articleSlug]);

useEffect(() => {
const {title='', description='', body='', tag='', tagList=[] }  = article || {};
    setFormValue({
        title, description, body, tag, tagList 
    })
}, [article])

const successfulHandler = (article) => navigate(`/article/${article?.slug}`);

const submit = (evt) => {
        evt.preventDefault();
        dispatch(editArticle({formValue,slug:article.slug}, successfulHandler));
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

return <Container>
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
</Container>
}

export default EditArticle;
