import React ,{ useEffect }from 'react';
import {  useParams, useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import action from '../../redux';
import ArticleList  from '../../components/ArticleList';
import { getNumberOfTabs } from '../../utils';
import {getToken} from '../../utils';





function FavoriteArticle() {
    const token = getToken();
    const navigate = useNavigate();
    const { username } = useParams();
    const dispatch = useDispatch();
    const {article: { getArticles, toggleFavorite  } } = action;
    const loading = useSelector(state => state.article.loading);
    const offset = useSelector(state => state.article.offset);
    const articlesCount = useSelector(state => state.article.articlesCount);
    const limit =  useSelector(state => state.article.limit);


    const articles  = useSelector(state => state.article.articles);

    const articlesCall = (offset) => () =>  dispatch(getArticles({ author: username, limit: limit, offset: offset || 0 }));

    useEffect(() => {
        dispatch(getArticles({favorited: username, limit: 5, offset: offset }));
    },[username]);

    const afterFavroiteHandler = () => dispatch(getArticles({favorited: username, limit: 5, offset: 0 }));;

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
           favoriteHandler={favoriteHandler} 
           paginationTabCount={getNumberOfTabs(articlesCount,limit)}
           nextTabClickHandler={articlesCall}
           offset={offset}
           limit={limit}
           paginationVisible={limit >= articlesCount?false:true}
           />
    }
    
    return (<div >
        {createArticleUI()}
    </div>)
}

export default FavoriteArticle;