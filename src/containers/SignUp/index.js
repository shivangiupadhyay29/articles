import React, { useState }  from 'react';
import Form from '../../components/AuthForm';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../../redux';
import { useNavigate } from 'react-router-dom';


function SignUp(props) {
    const { headerTitle} = props;
    const [ formValue, setFormValue ] = useState({ username:'', email:'',  password:''  });
    const dispatch = useDispatch();
    const error = useSelector(state => state.login.registerError);
    const loading = useSelector(state => state.login.registerLoading);
    const { register  } = actions.auth;
    const navigate = useNavigate();

    const successfulSignUpHanlder = () => {
        navigate( '/');
    };

    const submitForm = (event) =>  {
        event.preventDefault();
        dispatch(register(formValue,successfulSignUpHanlder));
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

export default SignUp;