import React  from 'react';
import { mapRoutesToName, formPlaceholder } from '../../constants';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';

import FormHeader from '../FormHelpers/header';
import ErrorMessage from '../FormHelpers/error';

import style from './style'; 

function AuthFormSkeleton(props) {
    const { headerTitle, error, formValue:{ email, password, username = null}, submitForm,
     onFieldChangeHandler, loading } = props;

    return (
        <Container  style={style["form-center"]}>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }} style={style["center-header"]}>
                                <FormHeader headerTitle={headerTitle} isAuthForm={true} headerStyleClass={'text-xs-center'}/>
                        </Col>
                        <Col md={{ span: 8, offset: 2 }} style={style["center-header"]}>
                            {error && 
                                    <ErrorMessage  error={error} errorTextStyle={style['error-text']}/>
                            }
                        </Col>
                    </Row>

                    <Row>
                        <Col md={{ span: 6, offset: 3 }} lg={{span: 6, offset: 3}} sm={{span: 6, offset: 3}}>
                                <Form onSubmit={submitForm}>
                                    {headerTitle === mapRoutesToName['/register'] && 
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Control name='username' type="text" placeholder={formPlaceholder['UserName']} value={username} onChange={onFieldChangeHandler} />
                                    </Form.Group>}

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control name='email' type="email" placeholder={formPlaceholder['Email']} value={email} onChange={onFieldChangeHandler}/>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Control name='password' type="password" placeholder={formPlaceholder['Password']} value={password} onChange={onFieldChangeHandler}/>
                                    </Form.Group>

                                    <Button variant="success" type="submit" className="pull-right" disabled={loading}>
                                            {headerTitle}
                                    </Button>

                            </Form>
                        </Col>
                    </Row>

        </Container>
    );
}

export default AuthFormSkeleton;