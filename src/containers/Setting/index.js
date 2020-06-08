import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SettingsForm from '../../components/SettingsForm'; 
import { settingsTitle } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';

import actions from '../../redux';
import { useNavigate } from 'react-router-dom';

 function Settings(props){
    const  {title} = props;
    
    const user = useSelector(state => state.login.user);
    const {  image, username, bio, email,  newPassword=''  }  = user || {};
    const error = useSelector(state => state.login.settingError);
    const loading = useSelector(state => state.login.settingsLoading);
    const dispatch = useDispatch();
    
    const [ formValue, setFormValue ] = useState({ 
        image, username, bio, email,  newPassword });

    const { getSettings, setSettings, logout } = actions.auth;

    const navigate = useNavigate();

    const getSettingHandler = (user) => {
        const {  image, username, bio, email,  newPassword=''  }  = user;
        setFormValue(current => ({ ...current,  image, username, bio, email,  newPassword }));
    }

    useEffect(() => {
        dispatch(getSettings(null,getSettingHandler));
    },[]);
    
    const successfulUpdateSettings = ({ username }) => navigate( `/@${username}`);

    const submitForm = (event) =>  {
        event.preventDefault();
        dispatch(setSettings( {...formValue, password:formValue.newPassword}, successfulUpdateSettings));
    }

const onChangeHandler = (event) => {
    const { target:{ name, value } } = event;
    setFormValue(current => ({...current, [name]: value}));
}

const afterLogoutHandler = () => navigate('/');

const logoutHandler = () => {
    dispatch(logout(null,afterLogoutHandler));
}
    
return (
    <Container>
            <Row className={'justify-content-md-center'}>
                <SettingsForm  
                    title={title}
                    error={error}
                    submit={submitForm}
                    changeHanlder={onChangeHandler}
                    formValue={formValue}
                    logout={logoutHandler}
                    loading={loading} 
                />
            </Row>
    </Container>
)
}

Settings.defaultProps = {
    title: settingsTitle
}

Settings.propTypes = {
    title: PropTypes.string.isRequired
}
export default Settings;