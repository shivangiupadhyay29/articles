import React from 'react';
import { Form, Button, Col, } from 'react-bootstrap';

import { settingFormPlaceholder } from '../../constants';

import ErrorMessage from '../FormHelpers/error';
import FormHeader from '../FormHelpers/header';

import style from './style';

function SettingsForm(props) {
    const {  title, error, submit, changeHanlder, formValue, loading, logout } = props;
    const { image, username, bio, email, newPassword } = formValue;
    return (
        <Col className={'col-md-6 col-xs-12'}>
                        
                        <Col md={12} xs={12} lg={12}>
                            <FormHeader headerTitle={title} headerStyleClass={'text-center'} isAuthForm={false}/>
                        </Col>
                        
                        {error && <Col md={12} xs={12} lg={12}>
                                <ErrorMessage error={error} errorTextStyle={style['error-text']}/>
                        </Col>}

                            <Col md={12} xs={12} lg={12}>
                                    <Form onSubmit={submit}>
                                            <Form.Group controlId="exampleForm.ControlInput1">
                                                <Form.Control name={'image'} value={image} type="text" placeholder={settingFormPlaceholder.imageUrl} onChange={changeHanlder} />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Control name={'username'} value={username}  type="text" size="lg" placeholder={settingFormPlaceholder.username} onChange={changeHanlder} />
                                            </Form.Group>

                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                <Form.Control name={'bio'}   value={bio} as="textarea" rows="10" placeholder={settingFormPlaceholder.bio} onChange={changeHanlder} />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Control  name={'email'}  value={email} type="email" size="lg" placeholder={settingFormPlaceholder.email} onChange={changeHanlder} />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Control name={'newPassword'} value={newPassword} type="password" size="lg" placeholder={settingFormPlaceholder.newPassword} onChange={changeHanlder} />
                                            </Form.Group>
                                        
                                            <Button variant="success" size="lg" type="submit" className="pull-right" disabled={loading}>
                                                    {settingFormPlaceholder.updateSettings}
                                            </Button>
                                    </Form>
                            </Col>

                            <Col md={12} xs={12} lg={12} style={{ marginTop: 5+'rem' }}>
                                <hr/>
                                <Button  size="md" variant="outline-danger" onClick={logout}>{settingFormPlaceholder.logout}</Button>
                            </Col>

                </Col>
    )
}

export default SettingsForm;