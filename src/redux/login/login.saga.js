import loginConstants  from './login.constant';
import { baseApiURL, loginURL, type, registerURL, userURL, profileURL } from '../../api/api.constants';
import { api } from '../../api';
import {  storeInLocalStorage, deleteFromLocalStorage } from '../../utils';

import { put, takeLatest } from 'redux-saga/effects';



  function* loginRequest(action){
    //action object is available here:-
    const { params = null, handler: successfulLoginHanlder} = action;
    const url = baseApiURL + loginURL;
    const body = { user: params };
    const json = yield api( url, type.POST, null,body).then(response => response);
    
    const { errors = null, user = null } = json;
    //set token in localStorage and user info
    user && storeInLocalStorage(user);
    yield put({ type: loginConstants.LOGIN_RECEIVED,  json: user, errors });

    //to run handler only when there is no error
    !errors && successfulLoginHanlder();
  }

export function* loginWatcher() {
    yield takeLatest( loginConstants.LOGIN_REQUEST,  loginRequest);
}


  
function* registerRequest(action){
    //action object is available here:-
    const { params = null, handler:successfulSignUpHanlder } = action;
    const url = baseApiURL + registerURL;
    const body = { user: params };
    const json = yield api( url, type.POST, null, body).then(response => response);
    
    const { errors = null, user = null } = json;
    user && storeInLocalStorage(user);
    yield put({ type: loginConstants.REGISTER_RECEIVED,  json: user, errors });
    
    //to run handler only when there is no error
    !errors && successfulSignUpHanlder();
  }

  export function* registerWatcher() {
    yield takeLatest( loginConstants.REGISTER_REQUEST,  registerRequest);
 }



 export function* restoreWatcher() {
    yield put({ type: loginConstants.RESTORE_ONLOAD });
 }

  
 function* settingsRequest(action){
  //action object is available here:-
  const { handler:successfulSettings } = action;
  const url = baseApiURL + userURL;
  const json = yield api( url, type.GET, null, null).then(response => response);
  
  const { errors = null, user = null } = json;
  user && storeInLocalStorage(user);
  yield put({ type: loginConstants.SETTINGS_RECEIVED,  json: user, errors });
  
  //to run handler only when there is no error
  !errors && successfulSettings(user);
}


 export function* settingsWatcher(){
   yield takeLatest( loginConstants.SETTINGS_REQUEST,  settingsRequest);
 }

 function* updateSettingsRequest(action){
  //action object is available here:-
  const { params = null, handler: successfulSettingsUpdateHandler } = action;
  const url = baseApiURL + userURL;
  const body = { user: params };
  const json = yield api( url, type.PUT, null, body).then(response => response);
  
  const { errors = null, user = null } = json;
  user && storeInLocalStorage(user);
  yield put({ type: loginConstants.SETTINGS_RECEIVED,  json: user, errors });
  
  //to run handler only when there is no error
  !errors && successfulSettingsUpdateHandler(user);
}

 export function* settingsUpdateWatcher(){
   yield takeLatest( loginConstants.SETTINGS_UPDATE_REQUEST, updateSettingsRequest);
 }

export function* logoutRequest(action){
  const { handler } = action;
  yield put({ type: loginConstants.LOGOUT_RECEIVED });
  deleteFromLocalStorage();
  handler();
}


 export function* logoutWatcher(){
   yield takeLatest(loginConstants.LOGOUT_REQUEST,logoutRequest);
 }

 export function* profileRequest(action){
    //action object is available here:-
    const { params=null } = action;
    console.log('params>>>>>>>>>>>>>>>>>', params);
    const url = baseApiURL + profileURL + params;
    const json = yield api( url, type.GET, null, null).then(response => response);
    
    const { errors = null, profile = null } = json;
    // user && storeInLocalStorage(user);
    yield put({ type: loginConstants.PROFILE_RECEIVED,  json: profile, errors });
    
    //to run handler only when there is no error
    // !errors && successfulProfile(profile);
 }

 export function* profileWatcher(){
  yield takeLatest(loginConstants.PROFILE_REQUEST, profileRequest);
 }

 export function* userRequest(){
  const url = baseApiURL + userURL;
  const json = yield api( url, type.GET, null, null).then(response => response);
  
  const { errors = null, user = null } = json;
  user && storeInLocalStorage(user);
  yield put({ type: loginConstants.USER_RECEIVED,  json: user, errors });
 }

 export function* userWatcher(){
   yield takeLatest(loginConstants.USER_REQUEST, userRequest);
 }