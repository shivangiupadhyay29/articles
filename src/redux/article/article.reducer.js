import articleConstant  from './article.constants';

const initState = {
    articles: [],
    currentArticle:null,
    limit: 5,
    globalLimit: 10,
    offset:0
}

const reducer = (state = initState, action) => {
    switch (action.type) {
      case articleConstant.GET_ARTICLES:
      return { ...state, loading: true };
      case articleConstant.ARTICLES_RECEIVED:
      return { 
      ...state,
      articles: action.json,
      loading: false, 
      articlesCount: action.articlesCount,
      offset:action.offset,
      limit:action.limit }
      case articleConstant.POST_ARTICLES_REQUEST:
      return {...state, loading:true}
      case articleConstant.POST_ARTICLES_RECEIVED:
      return {...state, loading:false, currentArticle:action.json, error:action.errors}
      case articleConstant.ARTICLE_REQUEST:
      return {...state, loading:true }
      case articleConstant.ARTICLE_RECEIVED:
      return {...state, loading:false, currentArticle:action.json, error:action.errors}
      case articleConstant.FOLLOWING_RECEIVED:{
      const {currentArticle } = state;
      return {...state, loading:false, currentArticle: { ...currentArticle, author:{...action?.json?.profile } } , error:action.errors}}
      case articleConstant.FAVORITE_RECEIVED:{
          let { articles } = state;
          let index = articles.findIndex((ele) => ele?.slug === action?.json?.slug);
          articles.splice(index,1);
          articles.splice(index,0,action.json);
          return {...state, loading:false, currentArticle:action.json, error:action.errors, articles:[...articles ]} 
     }
     case articleConstant.DELETE_REQUEST:
     return {...state, loading:true } 
     case articleConstant.DELETE_RECEIVED:
     return {...state, loading:false, error:action.errors} 
     case articleConstant.EDIT_RECEIVED:
     return {...state, loading:false, error:action.errors, currentArticle:action.json} 
     case articleConstant.EDIT_REQUEST:
     return {...state, loading:true }
      default: 
           return state;
     }
   };

   export default reducer;