import React, { useEffect } from 'react';
import {  useParams,  useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ArticleList  from '../../components/ArticleList';
import { getNumberOfTabs } from '../../utils';
import action from '../../redux';
import {getToken} from '../../utils';

function ProfileArticles() {
    const { username } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { article: { getArticles, toggleFavorite  } } = action;
    const token = getToken();

    const limit =  useSelector(state => state.article.limit);

    const articles  = useSelector(state => state.article.articles);
    const loading = useSelector(state => state.article.loading);
    const offset = useSelector(state => state.article.offset);
    const articlesCount = useSelector(state => state.article.articlesCount);

    const articlesCall = (offset) => () =>  dispatch(getArticles({ author: username, limit: limit, offset: offset || 0 }));


    useEffect(() => {
        dispatch(getArticles({author: username, limit: limit, offset: offset || 0 }));
    },[username]);

    const afterFavroiteHandler = () => console.info('');

    const favoriteHandler = (slug, toggleValue) => () => {
        if(!token){
            navigate('/login');
        }else{
        dispatch(toggleFavorite({ articleSlug:slug, toggleValue }, afterFavroiteHandler));
    }
}


    const createArticleUI = () =>{
        if(articles.length === 0 && !loading)
        return <span>{'No articles are here... yet.'}</span>
        
        else if(loading)
        return <span>{'Loading articles...'}</span>
    
        else 
        return <ArticleList 
                    articles={articles}  
                    paginationTabCount={getNumberOfTabs(articlesCount,limit)}
                    nextTabClickHandler={articlesCall}
                    offset={offset}
                    limit={limit}
                    favoriteHandler={favoriteHandler} 
                    paginationVisible={limit >= articlesCount?false:true}
                    />
        }
        
    return (<div>
            {createArticleUI()}
    </div>)
}

export default ProfileArticles;