import React from 'react';
import {  Form, Button, Col } from 'react-bootstrap';
import { articleForm } from '../../constants';

import ErrorMessage from '../FormHelpers/error';

import style from './style'; 

const ArticleForm = (props) => {
    const { error, formValue:{ title, description, body, tag, tagList  } = {} , onChangeHandler, submit, removeTag, addTag } = props;

    return  <Col md={12} xs={12} lg={12} style={{height:100+'%'}}>
                   
                    {error && <Col md={12} xs={12} lg={12}>
                            <ErrorMessage error={error} errorTextStyle={style['error-text']}/>
                    </Col>}
                
                <Col md={12} xs={12} lg={12}>
                            <Form onSubmit={submit}>
                                    <Form.Group >
                                        <Form.Control name={'title'} value={title} type="text" size="lg" placeholder={articleForm.title}  onChange={onChangeHandler}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Control name={'description'} value={description} type="text" size="md" placeholder={articleForm.topic} onChange={onChangeHandler}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Control name={'body'} value={body} as="textarea" rows="10" placeholder={articleForm.article} onChange={onChangeHandler}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Control onKeyPress={addTag} name={'tag'} value={tag} type="text" size="md" placeholder={articleForm.tags} onChange={onChangeHandler} />
                                        <div>
                                            {
                                                tagList && tagList.map(element => <span style={style.chip}>{element}<i className="fa fa-close" style={{marginLeft:0.3+'rem'}} onClick={removeTag(element)}></i></span>)
                                            }
                                        </div>
                                    </Form.Group>


                                    <Button variant="success" size="lg" type="submit" className="pull-right">
                                        {articleForm.submit}
                                    </Button>
                            </Form>
                </Col>
    </Col>
}

export default ArticleForm;