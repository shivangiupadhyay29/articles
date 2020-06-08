import { combineReducers } from 'redux';

import article   from './article/article.reducer';
import login from './login/login.reducer';
import comment from './comment/comment.reducer';
import tag from './tags/tags.reducer';

export default combineReducers({ 
    article,
    login,
    comment,
    tag
});