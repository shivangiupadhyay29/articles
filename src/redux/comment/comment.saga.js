import commentConstants from './comment.constant';
import { baseApiURL, commentUrl, type, commentDeleteUrl } from '../../api/api.constants';
import { api } from '../../api';
import { put, takeLatest } from 'redux-saga/effects';



function* getComments(action){
    const {params = null, handler:successfulHandler} = action;
    const url = baseApiURL + commentUrl(params);

    const json = yield api( url, type.GET, null,null).then(response => response);
    const { errors = null, comments = null } = json;

    yield put({ type: commentConstants.COMMENTS_RECEIVED,  json: comments, errors });

    !errors && successfulHandler();
}

export function* commentsWatcher(){
    yield takeLatest( commentConstants.COMMENTS_REQUEST, getComments);
}


function* addComment(action){
    const {params :{ articleSlug , body:commentContent } = {}, addCommentHandler } = action;
    const url = baseApiURL + commentUrl(articleSlug);
    const body = { comment : commentContent}

    const json = yield api( url, type.POST, null,body).then(response => response);
    const { errors = null, comment = null } = json;

    yield put({ type: commentConstants.ADD_COMMENT_RECEIVED,  json: comment, errors });

    !errors && addCommentHandler();

}

export function* addCommentWatcher(){
    yield takeLatest( commentConstants.ADD_COMMENT_REQUEST, addComment);
}


function* deleteComment(action){
    const {params = {}, deleteHandler} = action;
    const url = baseApiURL + commentDeleteUrl(params);

    const json = yield api( url, type.DELETE, null,null).then(response => response);
    const { errors = null, comments = null } = json;
    const { id  } = params || {};
    yield put({ type: commentConstants.DELETE_COMMENT_RECEIVED,  json: id , errors });
    !errors && deleteHandler();
}

export function* deleteCommentWatcher(){
    yield takeLatest( commentConstants.DELETE_COMMENT_REQUEST, deleteComment);
}
