import articleConstant  from './article.constants';
import { baseApiURL, articlesURL, type, createArticleURL, articleUrl, followingAuthorUrl, favoriteArticleUrl } from '../../api/api.constants';
import { api } from '../../api';

import { put, takeLatest } from 'redux-saga/effects';
import articleConstants from './article.constants';

function* fetchArticles(action){
    const { params = null } = action;
    const { offset = 0, limit, isFeed = false } = params;
    const url = baseApiURL + articlesURL(isFeed)+ (params ? '?' : '');
    delete params['isFeed'];
    const json = yield api( url, type.GET, params).then(response => response);
    yield put({ type: articleConstant.ARTICLES_RECEIVED,  
    json: json.articles, articlesCount: json.articlesCount ?? 0, 
    offset, limit  });
}
  
export function* articleWatcher(params) {
       yield takeLatest( articleConstant.GET_ARTICLES,  fetchArticles);
}


function* addArticles(action){
    const { params=null, handler:successfulAddingArticle } = action;
    const url = baseApiURL + createArticleURL;
    const body = { article: params };
    const json = yield api( url, type.POST, null, body).then(response => response);

    const { errors = null, article = null } = json;
    yield put({ type: articleConstant.POST_ARTICLES_RECEIVED,  json: article, errors });

   !errors && successfulAddingArticle(article);

}

export function* newArticleWatcher(){
    yield takeLatest( articleConstant.POST_ARTICLES_REQUEST,  addArticles);
}

export function* getArticle(action){
    const { params = null, handler:successfulHandler } = action;
    const url = baseApiURL + articleUrl(params);
    const json = yield api( url, type.GET, null, null).then(response => response);

    const { errors = null, article = null } = json;
    yield put({ type: articleConstant.ARTICLE_RECEIVED,  json: article, errors });

   !errors && successfulHandler(article);

}

export function* getArticleWatcher(){
    yield takeLatest( articleConstant.ARTICLE_REQUEST, getArticle );
}

export function* toggleFavorite(action){
    const { params: { articleSlug, toggleValue } = {}, handler } = action;

    const url = baseApiURL + favoriteArticleUrl(articleSlug);
    const json = yield api( url, toggleValue ? type.POST : type.DELETE, null, null).then(response => response);

    const { errors = null, article = null } = json;
    yield put({ type: articleConstant.FAVORITE_RECEIVED,  json: article, errors });

   !errors && handler();
}

export function* toggleFavoriteWatcher(){
    yield takeLatest( articleConstant.FAVORITE_REQUEST, toggleFavorite );
}

export function* toggleFollowing(action){
    const { params:{ username, toggleValue } = {}, handler } = action;
    const url = baseApiURL + followingAuthorUrl(username);
    const json = yield api( url, toggleValue ? type.POST : type.DELETE, null, null).then(response => response);

    const { errors = null, article = null } = json;
    yield put({ type: articleConstant.ARTICLE_RECEIVED,  json: article, errors });

   !errors && handler();

}

export function* toggleFollowingWatcher(){
    yield takeLatest( articleConstant.FOLLOWING_REQUEST, toggleFollowing );
}


export function* deleteArticle(action){
    const { params = null, handler } = action;
    const url = baseApiURL + articleUrl(params);
    const json = yield api( url, type.DELETE, null, null).then(response => response);

    const { errors = null } = json;
    yield put({ type: articleConstant.DELETE_RECEIVED, errors });

   !errors && handler();

}

export function* deleteArticleWatcher(){
    yield takeLatest( articleConstant.DELETE_REQUEST, deleteArticle );
}


export function* editArticle(action){
    const { params:{formValue, slug} = null, handler } = action;
    const url = baseApiURL + articleUrl(slug);
    const body = {  article: formValue };
    const json = yield api( url, type.PUT, null, body).then(response => response);

    const { errors = null, article = null } = json;
    yield put({ type: articleConstant.EDIT_RECEIVED, json: article, errors });

   !errors && handler(article);

}

export function* editArticleWatcher(){
    yield takeLatest( articleConstant.EDIT_REQUEST, editArticle );
}