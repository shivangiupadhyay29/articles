import React, { useState }  from 'react';
import Form from '../../components/AuthForm';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../../redux';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    
    const { headerTitle} = props;
    const [ formValue, setFormValue ] = useState({ email:'',  password:'' });
    const dispatch = useDispatch();
    const error = useSelector(state => state.login.loginError);
    const loading = useSelector(state => state.login.loginLoading);
    const { login  } = actions.auth;
    const navigate = useNavigate();

    const successfulLoginHanlder = () => navigate( '/');

    const submitForm = (event) =>  {
        event.preventDefault();
        dispatch(login(formValue,successfulLoginHanlder));
    }

    const onChangeHandler = (event) => {
        const { target:{ name, value } } = event;
        setFormValue(current => ({...current,[name]: value}));
    }

    return <Form 
            headerTitle={headerTitle}
            error={error}
            formValue={formValue}
            submitForm={submitForm}
            onFieldChangeHandler={onChangeHandler}
            loading={loading}
    />
}

export default Login;