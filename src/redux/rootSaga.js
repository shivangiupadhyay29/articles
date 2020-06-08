import { all } from 'redux-saga/effects';

import { articleWatcher, deleteArticleWatcher, newArticleWatcher, getArticleWatcher, toggleFavoriteWatcher, toggleFollowingWatcher, editArticleWatcher } from './article/article.saga';

import { loginWatcher, registerWatcher, restoreWatcher, settingsWatcher, userWatcher,
settingsUpdateWatcher, logoutWatcher, profileWatcher } from './login/login.saga';

import { commentsWatcher, addCommentWatcher, deleteCommentWatcher } from './comment/comment.saga';

import { tagsWatcher }from './tags/tags.saga';

export default function* rootSaga() {
   yield all([

        loginWatcher(),
        registerWatcher(),
        restoreWatcher(),
        settingsWatcher(),
        settingsUpdateWatcher(),
        logoutWatcher(),
        
        profileWatcher(),
        userWatcher(),
        toggleFollowingWatcher(),

        articleWatcher(),
        newArticleWatcher(),
        getArticleWatcher(),
        toggleFavoriteWatcher(),
        deleteArticleWatcher(),
        editArticleWatcher(),
    
        commentsWatcher(),
        deleteCommentWatcher(),
        addCommentWatcher(),

        tagsWatcher()
    ]);
}