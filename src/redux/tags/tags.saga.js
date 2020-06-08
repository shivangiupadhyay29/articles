import tagsConstants from './tags.constant';
import { baseApiURL, tagsUrl, type } from '../../api/api.constants';
import { api } from '../../api';
import { put, takeLatest } from 'redux-saga/effects';



function* getTags(action){
    // const {params = null, handler:successfulHandler} = action;
    const url = baseApiURL + tagsUrl;

    const json = yield api( url, type.GET, null,null).then(response => response);
    const { errors = null, tags = null } = json;

    yield put({ type: tagsConstants.GET_TAGS_RECEIVED,  json: tags, errors });

    // !errors && successfulHandler();
}

export function* tagsWatcher(){
    yield takeLatest( tagsConstants.GET_TAGS_REQUEST, getTags);
}