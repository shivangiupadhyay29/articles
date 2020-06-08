import articleConstant  from './article.constants';

export const getArticles = (params) => ({
    type: articleConstant.GET_ARTICLES,
    params
});

export const addArticles = (params,handler) => ({
    type: articleConstant.POST_ARTICLES_REQUEST,
    params,
    handler
});

export const getArticle = (params,handler) => ({
    type:articleConstant.ARTICLE_REQUEST,
    params,
    handler
})

export const  toggleFavorite =(params,handler) =>({
    type: articleConstant.FAVORITE_REQUEST,
    params,
    handler
})

export const toggleFollowing = (params,handler) =>({
    type: articleConstant.FOLLOWING_REQUEST,
    params,
    handler
})

export const deleteArticle = (params,handler) =>({
    type: articleConstant.DELETE_REQUEST,
    params,
    handler
})

export const editArticle = (params,handler) => ({
    type: articleConstant.EDIT_REQUEST,
    params,
    handler
})

